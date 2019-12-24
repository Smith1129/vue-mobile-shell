export default (Vue) => {
    Vue.directive('fColor', {
        inserted: function (el, binding) {
            el.style.color = binding.value;
        }
    });
    Vue.directive('autoFocus', {
        inserted: function (el) {
            el.focus();
        }
    });
}
