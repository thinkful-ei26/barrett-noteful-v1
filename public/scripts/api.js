/* global $ */
'use strict';

const api = {

  search: function (query) {
    return $.ajax({
      type: 'GET',
      url: '/api/notes/',
      dataType: 'json',
      data: query,
    });
  },

  // search: function (query, callback) {
  //   $.ajax({
  //     type: 'GET',
  //     url: '/api/notes/',
  //     dataType: 'json',
  //     data: query,
  //     success: callback
  //   });
  // },

  details: function (id) {
    return $.ajax({
      type: 'GET',
      dataType: 'json',
      url: `/api/notes/${id}`,
    });
  },

  // details: function (id, callback) {
  //   $.ajax({
  //     type: 'GET',
  //     dataType: 'json',
  //     url: `/api/notes/${id}`,
  //     success: callback
  //   });
  // },

  update: function (id, obj) {
    return $.ajax({
      type: 'PUT',
      url: `/api/notes/${id}`,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(obj),
    });
  },

  // update: function (id, obj, callback) {
  //   $.ajax({
  //     type: 'PUT',
  //     url: `/api/notes/${id}`,
  //     contentType: 'application/json',
  //     dataType: 'json',
  //     data: JSON.stringify(obj),
  //     success: callback
  //   });
  // },

  create: function (obj) {
    return $.ajax({
      type: 'POST',
      url: '/api/notes',
      contentType: 'application/json',
      dataType: 'json',
      processData: false,
      data: JSON.stringify(obj),
    });
  },

  // create: function (obj, callback) {
  //   $.ajax({
  //     type: 'POST',
  //     url: '/api/notes',
  //     contentType: 'application/json',
  //     dataType: 'json',
  //     processData: false,
  //     data: JSON.stringify(obj),
  //     success: callback
  //   });
  // },

  remove: function (id) {
    return $.ajax({
      type: 'DELETE',
      url: `/api/notes/${id}`,
      dataType: 'json',
    });
  },

  update: function(id, obj, callback) {
    $.ajax({
      type: 'PUT',
      url: `/api/notes/${id}`,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(obj),
      success: callback
    });
  }

  // remove: function (id, callback) {
  //   return $.ajax({
  //     type: 'DELETE',
  //     url: `/api/notes/${id}`,
  //     dataType: 'json',
  //     success: callback
  //   });
  // }

};