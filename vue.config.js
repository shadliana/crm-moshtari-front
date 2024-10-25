const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    define: {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
    },
    transpileDependencies: true,
});
