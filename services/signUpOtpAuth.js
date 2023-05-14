const mapData = new Map();

function setMapData (id, data) {
    mapData.set(id, data);
}

function getMapData (id) {
    return mapData.get(id);
}

function deleteMapData (id) {
    mapData.delete(id);
}

module.exports = {
    setMapData,
    getMapData,
    deleteMapData,
}