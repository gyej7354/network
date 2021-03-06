/**
 * The ActivityController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/ActivityService');
const createActivity = async (request, response) => {
  await Controller.handleRequest(request, response, service.createActivity);
};

const deleteActivity = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteActivity);
};

const getActivities = async (request, response) => {
  await Controller.handleRequest(request, response, service.getActivities);
};

const getActivity = async (request, response) => {
  await Controller.handleRequest(request, response, service.getActivity);
};

const getActivityUsers = async (request, response) => {
  await Controller.handleRequest(request, response, service.getActivityUsers);
};


module.exports = {
  createActivity,
  deleteActivity,
  getActivities,
  getActivity,
  getActivityUsers,
};
