(function () {
    'use strict';

    angular
        .module('Yaka')
        .service('pendingRequests', function () {
            var pending = [];
            this.get = function () {
                return pending;
            };
            this.add = function (request) {
                pending.push(request);
            };
            this.remove = function (request) {
                pending = _.filter(pending, function (p) {
                    return p.url !== request;
                });
            };
            this.cancelAll = function () {
                angular.forEach(pending, function (p) {
                    p.canceller.resolve();
                });
                pending.length = 0;
            };
        })
        .service('httpService', ['$http', '$q', 'pendingRequests', function ($http, $q, pendingRequests) {
            this.get = function (url) {
                var canceller = $q.defer();
                pendingRequests.add({
                    method: "get",
                    url: url,
                    canceller: canceller
                });
                //Request gets cancelled if the timeout-promise is resolved
                var requestPromise = $http.get(url, {timeout: canceller.promise});
                //Once a request has failed or succeeded, remove it from the pending list
                requestPromise.finally(function () {
                    pendingRequests.remove(url);
                });
                return requestPromise;
            };
            this.post = function (url, data) {
                var canceller = $q.defer();
                pendingRequests.add({
                    method: "post",
                    url: url,
                    canceller: canceller
                });
                //Request gets cancelled if the timeout-promise is resolved
                var requestPromise = $http.post(url, data, {timeout: canceller.promise});
                //Once a request has failed or succeeded, remove it from the pending list
                requestPromise.finally(function () {
                    pendingRequests.remove(url);
                });
                return requestPromise;
            };
            this.put = function (url, data) {
                var canceller = $q.defer();
                pendingRequests.add({
                    method: "put",
                    url: url,
                    canceller: canceller
                });
                //Request gets cancelled if the timeout-promise is resolved
                var requestPromise = $http.put(url, data, {timeout: canceller.promise});
                //Once a request has failed or succeeded, remove it from the pending list
                requestPromise.finally(function () {
                    pendingRequests.remove(url);
                });
                return requestPromise;
            };
            this.delete = function (url, data) {
                var canceller = $q.defer();
                pendingRequests.add({
                    method: "delete",
                    url: url,
                    canceller: canceller
                });
                //Request gets cancelled if the timeout-promise is resolved
                var requestPromise = $http.delete(url, data, {timeout: canceller.promise});
                //Once a request has failed or succeeded, remove it from the pending list
                requestPromise.finally(function () {
                    pendingRequests.remove(url);
                });
                return requestPromise;
            };
        }])
        .factory('networkService', NetworkService);

    //
    //Network Service Routing
    function NetworkService(httpService, CONFIG) {
        var baseUrl = CONFIG.API_BASE_URL;

        return {
            login: function (data, success, error) {
                httpService.post(baseUrl + '/login', data).success(success).error(error)
            },
            register: function (data, success, error) {
                httpService.post(baseUrl + '/register', data).success(success).error(error)
            },
            proRegister: function (data, success, error) {
                httpService.post(baseUrl + '/pro/register', data).success(success).error(error)
            },
            projectGET: function (data, success, error) {
                httpService.get(baseUrl + '/projects/' + data).success(success).error(error)
            },
            skillsGET: function (success, error) {
                httpService.get(baseUrl + '/pro/availableactivities').success(success).error(error)
            },
            proProjectGET: function (data, success, error) {
                httpService.get(baseUrl + '/pro/projects/' + data).success(success).error(error)
            },
            projectsGET: function (status, page, limit, success, error) {
                httpService.get(baseUrl + '/projects/me?page=' + page + '&limit=' + limit + '&status=' + status).success(success).error(error)
            },
            criteriaGET: function (success, error) {
                httpService.get(baseUrl + '/proposals/rate/availablecritera').success(success).error(error)
            },
            proToRate: function (success, error) {
                httpService.get(baseUrl + '/projects/torate').success(success).error(error)
            },
            ratePro: function (data, success, error) {
                httpService.post(baseUrl + '/proposals/' + data.id + "/rate", data).success(success).error(error)
            },
            projectSMALLPOST: function (data, success, error) {
                httpService.post(baseUrl + '/projects/small', data).success(success).error(error)
            },
            closeProject: function (data, success, error) {
                httpService.post(baseUrl + '/proposals/' + data + '/complete').success(success).error(error)
            },
            changePassword: function (data, success, error) {
                httpService.put(baseUrl + '/me/password', data).success(success).error(error)
            },
            projectEMERGENCYPOST: function (data, success, error) {
                httpService.post(baseUrl + '/projects/emergency', data).success(success).error(error)
            },
            activitiesGET: function (success, error) {
                httpService.get(baseUrl + '/projects/activities').success(success).error(error)
            },
            profileGET: function (success, error) {
                httpService.get(baseUrl + '/me').success(success).error(error)
            },
            chatsGET: function (success, error) {
                httpService.get(baseUrl + '/me/chats').success(success).error(error)
            },
            professionalGET: function (success, error) {
                httpService.get(baseUrl + '/pro/me').success(success).error(error)
            },
            proLeadsGET: function (type, sw_lat, sw_lng, ne_lat, ne_lng, success, error) {
                httpService.get(baseUrl + '/pro/leads?type=' + type + "&sw_lat=" + sw_lat + "&sw_lng=" + sw_lng + "&ne_lat=" + ne_lat + "&ne_lng=" + ne_lng).success(success).error(error)
            },
            proposalGET: function (data, success, error) {
                httpService.get(baseUrl + '/proposals/' + data).success(success).error(error)
            },
            proposalProGET: function (data, success, error) {
                httpService.get(baseUrl + '/pro/proposals/' + data).success(success).error(error)
            },
            proProposalsGET: function (status, success, error) {
                httpService.get(baseUrl + '/pro/proposals?status=' + status).success(success).error(error)
            },
            proProposalGET: function (id, success, error) {
                httpService.get(baseUrl + '/pro/proposals/' + id).success(success).error(error)
            },
            proProposalsArchiveGET: function (id, success, error) {
                httpService.get(baseUrl + '/pro/proposals/' + id + '/archive').success(success).error(error)
            },
            proposalAcceptPOST: function (proposalId, success, error) {
                httpService.post(baseUrl + '/proposals/' + proposalId + "/accept").success(success).error(error)
            },
            proposalDeclinePOST: function (proposalId, success, error) {
                httpService.post(baseUrl + '/proposals/' + proposalId + "/decline").success(success).error(error)
            },
            proposalEmergencyPOST: function (data, success, error) {
                httpService.post(baseUrl + '/pro/proposals/emergency', data).success(success).error(error)
            },
            proposalSmallPOST: function (data, success, error) {
                httpService.post(baseUrl + '/pro/proposals/small', data).success(success).error(error)
            },
            deleteProject: function (id, success, error) {
                httpService.delete(baseUrl + '/projects/' + id).success(success).error(error)
            },
            publishProject: function (id, success, error) {
                httpService.post(baseUrl + '/projects/' + id + '/publish').success(success).error(error)
            },
            projectPUT: function (data, success, error) {
                if (data.type == "EMERGENCY")
                    httpService.put(baseUrl + '/projects/emergency/' + data.id, data).success(success).error(error);
                else if (data.type == "SMALL_PROJECT")
                    httpService.put(baseUrl + '/projects/small/' + data.id, data).success(success).error(error);
            },
            proposalPUT: function (data, success, error) {
                if (data.type == "EMERGENCY")
                    httpService.put(baseUrl + '/pro/proposals/emergency/' + data.id, data).success(success).error(error);
                else if (data.type == "SMALL_PROJECT")
                    httpService.put(baseUrl + '/pro/proposals/small/' + data.id, data).success(success).error(error);
            },
            profilePUT: function (data, success, error) {
                httpService.put(baseUrl + '/me/profile', data).success(success).error(error)
            },
            proProfilePUT: function (data, success, error) {
                httpService.put(baseUrl + '/pro/me/profile', data).success(success).error(error)
            },
            proAboutMePUT: function (data, success, error) {
                httpService.put(baseUrl + '/pro/me/about', data).success(success).error(error)
            },
            proWorkAreaGET: function (success, error) {
                httpService.get(baseUrl + '/pro/me/workarea').success(success).error(error)
            },
            me: function (success, error) {
                httpService.get(baseUrl + '/me').success(success).error(error)
            },
            proWorkAreaPUT: function (data, success, error) {
                httpService.put(baseUrl + '/pro/me/workarea', data).success(success).error(error)
            },
            proActivitiesPUT: function (data, success, error) {
                httpService.put(baseUrl + '/pro/me/activities', data).success(success).error(error)
            },
            proPortfolioPUT: function (data, success, error) {
                httpService.put(baseUrl + '/pro/me/portfolio', data).success(success).error(error)
            },
            proVerificationsPUT: function (data, success, error) {
                httpService.put(baseUrl + '/pro/me/verifications', data).success(success).error(error)
            },
            messagesGET: function (id, page, limit, success, error) {
                httpService.get(baseUrl + '/chat/' + id + "/messages?page=" + page + "&limit=" + limit).success(success).error(error)
            },
            sendMessage: function (id, data, success, error) {
                httpService.post(baseUrl + '/chat/' + id + "/message", data).success(success).error(error)
            },
            messagesProGET: function (id, page, limit, success, error) {
                httpService.get(baseUrl + '/pro/chat/' + id + "/messages?page=" + page + "&limit=" + limit).success(success).error(error)
            },
            sendMessagePro: function (id, data, success, error) {
                httpService.post(baseUrl + '/pro/chat/' + id + "/message", data).success(success).error(error)
            },
            proProposalsInProgressGET: function (success, error) {
                httpService.get(baseUrl + '/pro/proposals/inprogress').success(success).error(error)
            },
            proProposalsDeclinedGET: function (success, error) {
                httpService.get(baseUrl + '/pro/proposals/declined').success(success).error(error)
            },
            contactsGET: function (success, error) {
                httpService.get(baseUrl + '/contacts').success(success).error(error)
            },
            inviteCustomerPOST: function (data, success, error) {
                httpService.post(baseUrl + '/invite/customer', data).success(success).error(error)
            },
            inviteProPOST: function (data, success, error) {
                httpService.post(baseUrl + '/invite/pro', data).success(success).error(error)
            },
            invitationsReceivedGET: function (success, error) {
                httpService.get(baseUrl + '/invitations/received').success(success).error(error)
            },
            invitationsSentGET: function (success, error) {
                httpService.get(baseUrl + '/invitations/sent').success(success).error(error)
            },
            refuseInvitationPOST: function (id, success, error) {
                httpService.post(baseUrl + '/invitations/' + id + '/refuse').success(success).error(error)
            },
            acceptInvitationPOST: function (id, success, error) {
                httpService.post(baseUrl + '/invitations/' + id + '/accept').success(success).error(error)
            },
            passwordForgottenPOST: function (data, success, error) {
                httpService.post(baseUrl + '/password/forgotten', data).success(success).error(error)
            },
            passwordNewPOST: function (data, success, error) {
                httpService.post(baseUrl + '/password/new', data).success(success).error(error)
            },
            setChatRead: function (chatId, success, error) {
                httpService.put(baseUrl + '/chat/' + chatId + '/read').success(success).error(error)
            },
            proSetChatRead: function (chatId, success, error) {
                httpService.put(baseUrl + '/pro/chat/' + chatId + '/read').success(success).error(error)
            }
        };
    }
})();
