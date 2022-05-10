function save_options() {
    var studomains = document.getElementById('studydomains').value;
    studomains = studomains.replace(/ /g, '').split(',');
    studomains = studomains.filter(e => e !== '');

    var distdomains = document.getElementById('distdomains').value;
    distdomains = distdomains.replace(/ /g, '').split(',');
    distdomains = distdomains.filter(e => e !== '');
    
    console.log(studomains);
    console.log(distdomains);

    chrome.storage.sync.set({
        studomains: studomains,
        distdomains: distdomains
    }, function() {
        alert("Changes Saved");
    });
}

function restore_options() {
    chrome.storage.sync.get({
        studomains: '',
        distdomains: ''
    }, function (result) {
        document.getElementById('studydomains').value = result.studomains;
        document.getElementById('distdomains').value = result.distdomains;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);