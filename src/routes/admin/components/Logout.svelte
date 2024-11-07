<script lang="ts">
	function logout() {
		document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		window.location.href = '/admin';
	}
</script>

<button
	class="rounded-md bg-orange-600 px-4 py-2 font-Poppins text-white active:scale-90"
	onclick={logout}>logout</button
>
