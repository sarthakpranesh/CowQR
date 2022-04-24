<script>
    import { fade } from 'svelte/transition';
    import Button from './components/Button.svelte'
    import QrCodeCard from './components/QRCodeCard.svelte';
    import { getAuth, signOut } from "firebase/auth";
    import { getFirestore, doc, updateDoc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore";
    import isUrl from 'validator/es/lib/isURL';

    // component states
    let showAddQrCode = false
    let newQrCodeUrl = {
        name: '',
        url: ''
    }
    let QrCodes = []

    const auth = getAuth()
    const user = auth.currentUser

    const db = getFirestore()
    const getAllQrCodes = () => {
        getDoc(doc(db, "user", user.uid))
            .then((docSnap) => {
                if (docSnap.exists()){
                    return docSnap.data()
                } else {
                    throw new Error('No Doc found')
                }
            })
            .then((data) => QrCodes = data.codes.reverse())
            .catch((err) => console.log("Error:", err.message))
    }
    const addQrCode = () => {
        if (newQrCodeUrl.name.length === 0 || newQrCodeUrl.url.length === 0) {
            return alert('Please add name and url both!')
        }

        if (!isUrl(newQrCodeUrl.url)) {
            return alert('Please provide a proper URL!')
        }

        showAddQrCode = false
        updateDoc(doc(db, "user", user.uid), {
            codes: arrayUnion({
                ...newQrCodeUrl,
                id: Date.now()
            })
        })
            .then(() => getAllQrCodes())
            .catch((err) => console.log('Error:', err.message))
    }
    const onDelete = (code) => {
        QrCodes = QrCodes.filter((qr) => qr.id !== code.id)
        updateDoc(doc(db, "user", user.uid), {
            codes: arrayRemove(code)
        })
            .then(() => getAllQrCodes())
            .catch((err) => console.log('Error:', err.message))
    }

    getAllQrCodes()
    $: console.log(QrCodes)
</script>
<style>
    #container {
        width: 98vw;
        min-height: 100vh;
        max-width: 1000px;

        display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;

        margin-bottom: 28px;
    }

    #headerWrapper {
        width: 100%;
        display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
    }

    #welcomeText {
        font-size: 28px;
        font-weight: 700;
    }

    #newQrCodeFormContainer {
        align-self: center;
        display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

        margin-top: 20px;
    }

    #newQrCodeFormContainer > label {
        font-size: 20px;
        font-weight: 400;
    }

    #newQrCodeFormContainer > input {
        padding: 8px 10px;
        margin-bottom: 16px;
        border-radius: 8px;
    }

    #newQrCodeFormContainer > div {
        width: 100%;
        display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
    }

    #qrCodesContainer {
        margin-top: 40px;
        width: 100%;

        display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
        flex-wrap: wrap;
    }

    @media only screen and (max-width: 600px) {
        #headerWrapper {
            flex-direction: column;
            justify-content: center;
            margin-bottom: 16px;
        }

        #qrCodesContainer {
            width: 100%;

            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
        }
    }
</style>
<div id="container">
    <div id="headerWrapper">
        <h1 id="welcomeText">
            Welcome, {user.displayName}
        </h1>
        <Button 
            title="Create New QR"
            onClick={() => showAddQrCode = true}
        />
    </div>
    <Button 
        title="Logout"
        onClick={() => {
            signOut(auth)
        }}
    />
    {#if showAddQrCode}
        <div in:fade out:fade id="newQrCodeFormContainer">
            <label for="name">Give it a name</label>
            <input type="text" bind:value={newQrCodeUrl.name} placeholder="My site's QR" />
            <label for="url">Enter URL to use</label>
            <input type="url" bind:value={newQrCodeUrl.url} placeholder="https://www.google.com" />
            <div>
                <Button 
                    title="Cancel"
                    onClick={() => showAddQrCode = false}
                />
                <Button 
                    title="Create"
                    onClick={addQrCode}
                />
            </div>
        </div>
    {/if}
    <div id="qrCodesContainer">
        {#each QrCodes as code, index (code.id)}
            <QrCodeCard name={code.name} url={code.url} index={index} onDelete={() => onDelete(code)} />
        {/each}
    </div>
</div>