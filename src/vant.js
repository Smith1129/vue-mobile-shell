import {
    Button,
    Loading,
    List,
    Cell,
    Toast,
    SwipeCell,
    Divider,
    Dialog,
    Picker,
    Popup,
    CellGroup,
    Tag,
    Tab,
    Tabs,
    Row,
    Col,
    PullRefresh,
    CountDown,
    Sticky,
    Overlay,
    Slider,
    NavBar 

} from 'vant';

export default {
    install(Vue) {
        Vue.use(Button);
        Vue.use(Loading);
        Vue.use(List);
        Vue.use(Cell);
        Vue.use(Toast);
        Vue.use(SwipeCell);
        Vue.use(Divider);
        Vue.use(Dialog);
        Vue.use(Picker);
        Vue.use(Popup);
        Vue.use(CellGroup);
        Vue.use(Tag);
        Vue.use(Tab);
        Vue.use(Tabs);
        Vue.use(Row);
        Vue.use(Col);
        Vue.use(PullRefresh);
        Vue.use(CountDown);
        Vue.use(Sticky);
        Vue.use(Overlay);
        Vue.use(Slider);
        Vue.use(NavBar);
        //...
    },
};