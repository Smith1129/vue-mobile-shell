<template>
	<div id="app">
		<loading></loading>
		<router-view />
	</div>
</template>
<script>
import loading from './components/loading';
export default {
	components: { loading }
};
</script>


