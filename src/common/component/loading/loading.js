import Loading from './BaseLoading'

let loadingInstance = null;

function getLoadingInstance(props) {
    if (loadingInstance) {
        return loadingInstance;
    }

    loadingInstance = Loading.newInstance(props);
    return loadingInstance;
}

const loading = {

    open: function(props) {
        getLoadingInstance(props).open();
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