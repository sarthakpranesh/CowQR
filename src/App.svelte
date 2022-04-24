<script>
	import Home from "./Home.svelte";
	import Button from "./components/Button.svelte";
	import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

	let user = null

	const auth = getAuth()
	const provider = new GoogleAuthProvider();
	provider.addScope('profile');
	provider.addScope('email');
	const createIfNewUser = (u) => {
		const db = getFirestore()
		const ref = doc(db, "user", u.uid)
		getDoc(ref)
			.then((docSnap) => {
				if (!docSnap.exists()) {
					setDoc(ref, {
						uid: u.uid,
						name: u.displayName,
						email: u.email,
						codes: []
					});
				}
			})
			.catch((err) => console.log("Error:", err.message))
	}
	auth.onAuthStateChanged((u) => {
		if (u !== null) {
			user = true
			createIfNewUser(u)
		} else {
			user = false
		}
	})
	$: console.log(user)
</script>
<style>
	main {
		width: 100vw;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	h1 {
		color: #ff3e00;
		font-size: 3em;
		font-weight: 500;
	}
</style>
<main>
	{#if user}
		<Home />
	{:else}
		<h1>Welcome to CowQR</h1>
		<Button title="Continue with Google" onClick={() => signInWithPopup(auth, provider)} />
	{/if}
</main>
