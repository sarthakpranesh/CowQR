<script>
    export let name
    export let url
    export let index
    export let onDelete = () => {}

    import QrCode from "svelte-qrcode"
    import Button from './Button.svelte'
    import html2canvas from 'html2canvas'
    import { fly, fade } from 'svelte/transition';

    const onDownloadQr = () => {
        html2canvas(document.getElementById('QR'))
            .then((canvas) => {
                var a = document.createElement('a');
                a.href = canvas.toDataURL();
                a.download = `QR-${name}.jpg`;
                a.click();
            })
            .catch((err) => console.log("Error:", err))
    }
</script>
<style>
    #qrCodeCardContainer {
        width: 96vw;
        max-width: 280px;
        border: 1px solid pink;
        border-radius: 8px;
        margin-right: 4px;
        margin-bottom: 4px;
        padding: 16px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        flex-wrap: wrap;
    }

    #qrCodeCardContainer > label {
        font-size: 16px;
        font-weight: 800;
        margin-bottom: 10px;
    }

    #QR {
        margin-bottom: 8px;
        padding: 4px;
        border-radius: 4px;
    }
</style>
<div
    id="qrCodeCardContainer"
    in:fly={{ x: 100, duration: 1000, delay: 100 * index }}
    out:fade={{ duration: 500 }}
>
    <label for="Qr Code name">{name}</label>
    <div id="QR">
        <QrCode
            errorCorrection="Q"
            value={url}
            size={200}
        />
    </div>
    <Button
        title="Download QR Code"
        onClick={onDownloadQr}
    />
    <Button
        title="Delete"
        onClick={onDelete}
        style="border-color: red; margin-top: 8px"
    />
</div>