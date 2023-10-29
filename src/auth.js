import $ from "jquery";
import {toggleModal} from "./utils";

let STATUS_OK = 1;
let STATUS_ERROR = -1;

function getAuth() {
    let isLoginForm = $('.js-form').hasClass('form-enter');
    if (isLoginForm === true) {
        /**login*/
        getLogin();
    } else {
        /**register*/
        getRegister();
    }
}

function getRegister() {
    var data = {
        _csrf: $('meta[name="csrf-token"]').attr('content'),
        email: $('input[name="email"]').val(),
        password: $('input[name="password"]').val(),
    };

    $.ajax({
        url: '/signup',
        type: 'POST',
        data: data,//{data: JSON.stringify(data)},
        success: function (res) {
            if (res.status === STATUS_OK) {
                location.href = '/rooms';
            } else {
              toggleModal(res.message);
                setTimeout(function () {
                  toggleModal();
                }, 3000);
            }
        },
        error: function (mes) {
          toggleModal(mes.responseText);
        }
    });
}
function getLogin() {
    var data = {
        _csrf: $('meta[name="csrf-token"]').attr('content'),
        email: $('input[name="email"]').val(),
        password: $('input[name="password"]').val(),
    };

    $.ajax({
        url: '/login',
        type: 'POST',
        data: data,//{data: JSON.stringify(data)},
        success: function (res) {
            if (res.status === STATUS_OK) {
                location.href = '/rooms';
            } else {
              toggleModal(res.message);
                setTimeout(function () {
                  toggleModal();
                }, 3000);
            }
        },
        error: function (mes) {
          toggleModal(mes.responseText);
        }
    });
}

function getRequestPassReset() {
    var data = {
        _csrf: $('meta[name="csrf-token"]').attr('content'),
        email: $('input[name="email"]').val(),
    };

    $.ajax({
        url: '/request-password-reset',
        type: 'POST',
        data: data,//{data: JSON.stringify(data)},
        success: function (res) {
            if (res.status === STATUS_OK) {
              toggleModal(res.message);
                setTimeout(function () {
                  toggleModal();
                }, 3000);
            } else {
              toggleModal(res.message);
            }
        },
        error: function (mes) {
          toggleModal(mes.responseText);
        }
    });
}

function getSaveNewPassword() {
    let data = {
        _csrf: $('meta[name="csrf-token"]').attr('content'),
        password: $('input[name="password"]').val(),
    };
    let token = $('input[name="token"]').val();

    $.ajax({
        url: '/reset-password?token=' + token,
        type: 'POST',
        data: data,//{data: JSON.stringify(data)},
        success: function (res) {
          toggleModal(res.message);
          setTimeout(function () {
            toggleModal();
          }, 3000);

          if (res.status === STATUS_OK) {
                window.location.href = '/index';
          }
        },
        error: function (mes) {
          toggleModal(mes.responseText);
        }
    });
}

export { getAuth, getRegister, getLogin, getRequestPassReset, getSaveNewPassword };
