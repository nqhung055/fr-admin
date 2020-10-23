<template>
	<v-menu offset-y origin="right top" left content-class="language-dropdown" transition="slide-y-transition" nudge-top="-10">
		<template v-slot:activator="{ on }">
			<div v-on="on" class="dash-title red"><span>{{ $t('message.devicesHealth') }}</span></div>
		</template>
	</v-menu>
</template>

<script>
	import {
		mapGetters
	} from "vuex";

	export default {
		computed: {
			...mapGetters(["selectedLocale", "languages"])
		},
		methods: {
			changeLanguage(language) {
				this.$i18n.locale = language.locale;
				this.$store.dispatch("changeLanguage", language);
			}
		}
	};
</script>