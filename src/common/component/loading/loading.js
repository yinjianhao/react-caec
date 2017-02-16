import Loading from './BaseLoading'

let loadingInstance = null;

function getLoadingInstance() {
    if (loadingInstance) {
        return loadingInstance;
    }

    loadingInstance = Loading.newInstance();
    return loadingInstance;
}

const loading = {

    open: function() {
        getLoadingInstance().open();
    },
    close: function() {
        loadingInstance && loadingInstance.close();
    },
    destroy: function() {
        if (loadingInstance) {
            loadingInstance.destroy();
            loadingInstance = null;
        }
    }
}

export default loading