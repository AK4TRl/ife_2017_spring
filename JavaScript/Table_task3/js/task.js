"use strict";
function $(id) {
    return document.getElementById(id);
}
var dataOption = {
    bj: ["北京大学", "清华大学"],
    sh: ["上海大学", "上海交通大学"],
    gz: ["中山大学", "华南理工大学"]
};
var selectArea, selectSchool;
var labelSchool, labelCompany;
var tdCompany;

function changeForm(isStudent) {
    if (isStudent) {
        selectArea.style.display = 'block';
        selectSchool.style.display = 'block';
        labelSchool.style.display = 'block';
        tdCompany.style.display = 'none';
        labelCompany.style.display = 'none';
    } else {
        selectArea.style.display = 'none';
        selectSchool.style.display = 'none';
        labelSchool.style.display = 'none';
        tdCompany.style.display = 'block';
        labelCompany.style.display = 'block';
    }
}
function updateSchoolOption() {
    selectSchool.innerHTML = "";
    var schoolArr = dataOption[selectArea.options[selectArea.selectedIndex].value];
    schoolArr.forEach(function (v) {
        var option = document.createElement('option');
        option.value = v;
        option.textContent = v;
        selectSchool.appendChild(option);
    });
}

function init() {
    selectArea = $('select-area');
    selectSchool = $('select-school');
    labelSchool = $('label-school');
    labelCompany = $('label-company');
    tdCompany = $('td-company');
    $('student').addEventListener('change', function () {
        changeForm(true);
    });
    $('not-student').addEventListener('change', function () {
        changeForm(false);
    });
    selectArea.addEventListener('change', function () {
        updateSchoolOption();
    });
}

window.onload = init;