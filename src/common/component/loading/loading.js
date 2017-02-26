import Loading from './BaseLoading'

let loadingInstance = null;
let wrapEl = null;

function getLoadingInstance(props) {
    if (!loadingInstance) {
        loadingInstance = Loading.newInstance(props);
    }

    return loadingInstance;
}

const loading = {
    open: function (props = {}) {
        const {
            el = document.body
        } = props;

        if (wrapEl !== el) {
            this.destroy();
        }
        wrapEl = props.el = el;

        getLoadingInstance(props).open();
    },
    close: function () {
        loadingInstance && loadingInstance.close();
    },
    destroy: function () {
        if (loadingInstance) {
            loadingInstance.destroy();
            loadingInstance = null;
        }
    }
}

export default loading