<script>
    export let title
    export let onClick
	export let style = ""
</script>
<style>
	#google-btn {
		border: 1px solid blue;
		border-radius: 8px;
		padding: 4px 16px;
		cursor: pointer;
	}
</style>
<div id="google-btn" style={style} on:click={onClick}>
    {title}
</div>