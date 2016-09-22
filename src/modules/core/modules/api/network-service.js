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
        .service('httpService', function ($http, $q, pendingRequests) {
            this.get = function (url, ignoreLoading) {
                if (typeof ignoreLoading === 'undefined') {
                    ignoreLoading = false;
                }
                var canceller = $q.defer();
                pendingRequests.add({
                    method: "get",
                    url: url,
                    canceller: canceller
                });
                //Request gets cancelled if the timeout-promise is resolved
                var requestPromise = $http.get(
                    url,
                    {
                        timeout: canceller,
                        ignoreLoading: ignoreLoading
                    }
                );
                //Once a request has failed or succeeded, remove it from the pending list
                requestPromise.finally(function () {
                    pendingRequests.remove(url);
                });
                return requestPromise;
            };
            this.post = function (url, data, ignoreLoading) {
                if (typeof ignoreLoading === 'undefined') {
                    ignoreLoading = false;
                }
                var canceller = $q.defer();
                pendingRequests.add({
                    method: "post",
                    url: url,
                    canceller: canceller,
                    ignoreLoading: ignoreLoading
                });
                //Request gets cancelled if the timeout-promise is resolved
                var requestPromise = $http.post(
                    url,
                    data,
                    {
                        timeout: canceller.promise,
                        ignoreLoading: ignoreLoading
                    }
                );
                //Once a request has failed or succeeded, remove it from the pending list
                requestPromise.finally(function () {
                    pendingRequests.remove(url);
                });
                return requestPromise;
            };
            this.put = function (url, data, ignoreLoading) {
                if (typeof ignoreLoading === 'undefined') {
                    ignoreLoading = false;
                }
                var canceller = $q.defer();
                pendingRequests.add({
                    method: "put",
                    url: url,
                    canceller: canceller,
                    ignoreLoading: ignoreLoading
                });
                //Request gets cancelled if the timeout-promise is resolved
                var requestPromise = $http.put(
                    url,
                    data,
                    {
                        timeout: canceller.promise,
                        ignoreLoading: ignoreLoading
                    }
                );
                //Once a request has failed or succeeded, remove it from the pending list
                requestPromise.finally(function () {
                    pendingRequests.remove(url);
                });
                return requestPromise;
            };
            this.delete = function (url, data, ignoreLoading) {
                if (typeof ignoreLoading === 'undefined') {
                    ignoreLoading = false;
                }
                var canceller = $q.defer();
                pendingRequests.add({
                    method: "delete",
                    url: url,
                    canceller: canceller,
                    ignoreLoading: ignoreLoading
                });
                //Request gets cancelled if the timeout-promise is resolved
                var requestPromise = $http.delete(
                    url,
                    data,
                    {
                        timeout: canceller.promise,
                        ignoreLoading: ignoreLoading
                    }
                );
                //Once a request has failed or succeeded, remove it from the pending list
                requestPromise.finally(function () {
                    pendingRequests.remove(url);
                });
                return requestPromise;
            };
        })
        .factory('networkService', NetworkService);

    //
    //Network Service Routing
    function NetworkService(httpService, CONFIG) {
        var baseUrl = CONFIG.API_BASE_URL;

        return {
            login: function (data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/login', data, ignoreLoading).success(success).error(error)
            },
            loginGoogleDetach: function (success, error, ignoreLoading) {
                httpService.post(baseUrl + '/login/google/detach', ignoreLoading).success(success).error(error)
            },
            loginFacebookDetach: function (success, error, ignoreLoading) {
                httpService.post(baseUrl + '/login/facebook/detach', ignoreLoading).success(success).error(error)
            },
            register: function (data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/register', data, ignoreLoading).success(success).error(error)
            },
            proRegister: function (data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/pro/register', data, ignoreLoading).success(success).error(error)
            },
            projectGET: function (data, success, error, ignoreLoading) {
                httpService.get(baseUrl + '/projects/' + data, ignoreLoading).success(success).error(error)
            },
            skillsGET: function (success, error, ignoreLoading) {
                httpService.get(baseUrl + '/pro/availableactivities', ignoreLoading).success(success).error(error)
            },
            proProjectGET: function (data, success, error, ignoreLoading) {
                httpService.get(baseUrl + '/pro/projects/' + data, ignoreLoading).success(success).error(error)
            },
            projectsGET: function (status, page, limit, success, error, ignoreLoading) {
                httpService.get(baseUrl + '/projects/me?page=' + page + '&limit=' + limit + '&status=' + status, ignoreLoading).success(success).error(error)
            },
            criteriaGET: function (success, error, ignoreLoading) {
                httpService.get(baseUrl + '/proposals/rate/availablecritera', ignoreLoading).success(success).error(error)
            },
            proToRate: function (success, error, ignoreLoading) {
                httpService.get(baseUrl + '/projects/torate', ignoreLoading).success(success).error(error)
            },
            ratePro: function (data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/proposals/' + data.id + "/rate", data, ignoreLoading).success(success).error(error)
            },
            projectPOST: function (data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/projects', data, ignoreLoading).success(success).error(error)
            },
            closeProject: function (data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/proposals/' + data + '/complete', ignoreLoading).success(success).error(error)
            },
            changePassword: function (data, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/me/password', data, ignoreLoading).success(success).error(error)
            },
            updateProLinksPUT: function (data, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/pro/me/links', data, ignoreLoading).success(success).error(error)
            },
            activitiesGET: function (success, error, ignoreLoading) {
                httpService.get(baseUrl + '/projects/activities', ignoreLoading).success(success).error(error)
            },
            profileGET: function (success, error, ignoreLoading) {
                httpService.get(baseUrl + '/me', ignoreLoading).success(success).error(error)
            },
            professionalGET: function (success, error, ignoreLoading) {
                httpService.get(baseUrl + '/pro/me', ignoreLoading).success(success).error(error)
            },
            proLeadsGET: function (sw_lat, sw_lng, ne_lat, ne_lng, success, error, ignoreLoading) {
                httpService.get(baseUrl + '/pro/leads?sw_lat=' + sw_lat + '&sw_lng=' + sw_lng + '&ne_lat=' + ne_lat + '&ne_lng=' + ne_lng, ignoreLoading).success(success).error(error)
            },
            proposalGET: function (data, success, error, ignoreLoading) {
                httpService.get(baseUrl + '/proposals/' + data, ignoreLoading).success(success).error(error)
            },
            proProposalsGET: function (status, success, error, ignoreLoading) {
                httpService.get(baseUrl + '/pro/proposals?status=' + status, ignoreLoading).success(success).error(error)
            },
            proProposalGET: function (id, success, error, ignoreLoading) {
                httpService.get(baseUrl + '/pro/proposals/' + id, ignoreLoading).success(success).error(error)
            },
            proProposalsArchiveGET: function (id, success, error, ignoreLoading) {
                httpService.get(baseUrl + '/pro/proposals/' + id + '/archive', ignoreLoading).success(success).error(error)
            },
            proposalAcceptPOST: function (proposalId, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/proposals/' + proposalId + "/accept", ignoreLoading).success(success).error(error)
            },
            proposalDeclinePOST: function (proposalId, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/proposals/' + proposalId + "/decline", ignoreLoading).success(success).error(error)
            },
            proposalPOST: function (data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/pro/proposals', data, ignoreLoading).success(success).error(error)
            },
            deleteProject: function (id, data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/projects/' + id + '/delete', data, ignoreLoading).success(success).error(error)
            },
            projectPUT: function (data, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/projects/' + data.id, data, ignoreLoading).success(success).error(error);
            },
            proposalPUT: function (data, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/pro/proposals/' + data.id, data, ignoreLoading).success(success).error(error);
            },
            profilePUT: function (data, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/me/profile', data, ignoreLoading).success(success).error(error)
            },
            proProfilePUT: function (data, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/pro/me/profile', data, ignoreLoading).success(success).error(error)
            },
            proAboutMePUT: function (data, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/pro/me/about', data, ignoreLoading).success(success).error(error)
            },
            proWorkAreaGET: function (success, error, ignoreLoading) {
                httpService.get(baseUrl + '/pro/me/workarea', ignoreLoading).success(success).error(error)
            },
            proWorkAreaPUT: function (data, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/pro/me/workarea', data, ignoreLoading).success(success).error(error)
            },
            proActivitiesPUT: function (data, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/pro/me/activities', data, ignoreLoading).success(success).error(error)
            },
            proPortfolioPUT: function (data, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/pro/me/portfolio', data, ignoreLoading).success(success).error(error)
            },
            proVerificationsPUT: function (data, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/pro/me/verifications', data, ignoreLoading).success(success).error(error)
            },
            messagesGET: function (id, page, limit, success, error, ignoreLoading) {
                httpService.get(baseUrl + '/chat/' + id + "/messages?page=" + page + "&limit=" + limit, ignoreLoading).success(success).error(error)
            },
            sendMessage: function (id, data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/chat/' + id + "/message", data, ignoreLoading).success(success).error(error)
            },
            messagesProGET: function (id, page, limit, success, error, ignoreLoading) {
                httpService.get(baseUrl + '/pro/chat/' + id + "/messages?page=" + page + "&limit=" + limit, ignoreLoading).success(success).error(error)
            },
            sendMessagePro: function (id, data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/pro/chat/' + id + "/message", data, ignoreLoading).success(success).error(error)
            },
            proProposalDeclinePOST: function (proposalId, data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/pro/proposal/' + proposalId + '/decline', data, ignoreLoading).success(success).error(error)
            },
            contactsGET: function (success, error, ignoreLoading) {
                httpService.get(baseUrl + '/contacts', ignoreLoading).success(success).error(error)
            },
            inviteCustomerPOST: function (data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/invite/customer', data, ignoreLoading).success(success).error(error)
            },
            inviteProPOST: function (data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/invite/pro', data, ignoreLoading).success(success).error(error)
            },
            invitePOST: function (id, relation, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/invite/' + id + '/' + relation, ignoreLoading).success(success).error(error)
            },
            invitationsReceivedGET: function (success, error, ignoreLoading) {
                httpService.get(baseUrl + '/invitations/received', ignoreLoading).success(success).error(error)
            },
            invitationsSentGET: function (success, error, ignoreLoading) {
                httpService.get(baseUrl + '/invitations/sent', ignoreLoading).success(success).error(error)
            },
            refuseInvitationPOST: function (id, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/invitations/' + id + '/refuse', ignoreLoading).success(success).error(error)
            },
            acceptInvitationPOST: function (id, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/invitations/' + id + '/accept', ignoreLoading).success(success).error(error)
            },
            passwordForgottenPOST: function (data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/password/forgotten', data, ignoreLoading).success(success).error(error)
            },
            passwordNewPOST: function (data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/password/new', data, ignoreLoading).success(success).error(error)
            },
            setChatRead: function (chatId, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/chat/' + chatId + '/read', ignoreLoading).success(success).error(error)
            },
            proSetChatRead: function (chatId, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/pro/chat/' + chatId + '/read', ignoreLoading).success(success).error(error)
            },
            sendSupportMessage: function (supportMessage, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/support/message', supportMessage, ignoreLoading).success(success).error(error)
            },
            setContactsRead: function (success, error, ignoreLoading) {
                httpService.put(baseUrl + '/contacts/read', ignoreLoading).success(success).error(error)
            },
            projectsToRecommendGET: function (success, error, ignoreLoading) {
                httpService.get(baseUrl + '/recommend/projects/torecommend', ignoreLoading).success(success).error(error)
            },
            publicProjectsToRecommendGET: function (success, error, ignoreLoading) {
                httpService.get(baseUrl + '/public/recommend/projects/torecommend', ignoreLoading).success(success).error(error)
            },
            dashboardDataGET: function (success, error, ignoreLoading) {
                httpService.get(baseUrl + '/dashboard/infos', ignoreLoading).success(success).error(error)
            },
            proDashboardDataGET: function (success, error, ignoreLoading) {
                httpService.get(baseUrl + '/pro/dashboard/infos', ignoreLoading).success(success).error(error)
            },
            projectRecommendGET: function (id, success, error, ignoreLoading) {
                httpService.get(baseUrl + '/recommend/projects/' + id, ignoreLoading).success(success).error(error)
            },
            publicProjectRecommendGET: function (id, success, error, ignoreLoading) {
                httpService.get(baseUrl + '/public/recommend/projects/' + id, ignoreLoading).success(success).error(error)
            },
            projectRecommendMyProsGET: function (id, success, error, ignoreLoading) {
                httpService.get(baseUrl + '/recommend/projects/' + id + '/mypros', ignoreLoading).success(success).error(error)
            },
            recommendProForProjectPOST: function (id, professionalId, data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/recommend/projects/' + id + '/pro/' + professionalId, data, ignoreLoading).success(success).error(error)
            },
            recommendAndInviteProPOST: function (id, data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/recommend/projects/' + id + '/invite/pro', data, ignoreLoading).success(success).error(error)
            },
            getProNetworkLeads: function (success, error, ignoreLoading) {
                httpService.get(baseUrl + '/pro/projects/network', ignoreLoading).success(success).error(error)
            },
            adminProListGET: function (success, error, ignoreLoading) {
                httpService.get(baseUrl + '/admin/pro/list', ignoreLoading).success(success).error(error)
            },
            adminProDetailsGET: function (id, success, error, ignoreLoading) {
                httpService.get(baseUrl + '/admin/pro/' + id, ignoreLoading).success(success).error(error)
            },
            adminValidateProPOST: function (data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/admin/pro/validate', data, ignoreLoading).success(success).error(error)
            },
            adminInvalidateProPOST: function (id, data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/admin/pro/' + id + '/invalidate', data, ignoreLoading).success(success).error(error)
            },
            adminProProfilePUT: function (id, data, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/admin/pro/' + id + '/profile', data, ignoreLoading).success(success).error(error)
            },
            adminProAboutMePUT: function (id, data, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/admin/pro/' + id + '/about', data, ignoreLoading).success(success).error(error)
            },
            adminProWorkAreaPUT: function (id, data, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/admin/pro/' + id + '/workarea', data, ignoreLoading).success(success).error(error)
            },
            adminProActivitiesPUT: function (id, data, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/admin/pro/' + id + '/activities', data, ignoreLoading).success(success).error(error)
            },
            adminProVerificationsPUT: function (id, data, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/admin/pro/' + id + '/verifications', data, ignoreLoading).success(success).error(error)
            },
            adminProPortfolioPUT: function (id, data, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/admin/pro/' + id + '/portfolio', data, ignoreLoading).success(success).error(error)
            },
            adminChangePassword: function (id, data, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/admin/' + id + '/password', data, ignoreLoading).success(success).error(error)
            },
            adminProjectsListGET: function (success, error, ignoreLoading) {
                httpService.get(baseUrl + '/admin/projects', ignoreLoading).success(success).error(error)
            },
            adminPartnerListGET: function (success, error, ignoreLoading) {
                httpService.get(baseUrl + '/admin/pro/partners', ignoreLoading).success(success).error(error)
            },
            adminSetMainPartnerPUT: function (proId, partnerId, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/admin/pro/' + proId + '/mainpartner/' + partnerId, ignoreLoading).success(success).error(error)
            },
            adminProfileGET: function (id, success, error, ignoreLoading) {
                httpService.get(baseUrl + '/admin/users/' + id, ignoreLoading).success(success).error(error)
            },
            adminProposalAcceptPOST: function (proposalId, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/admin/proposals/' + proposalId + "/accept", ignoreLoading).success(success).error(error)
            },
            adminProjectGET: function (data, success, error, ignoreLoading) {
                httpService.get(baseUrl + '/admin/projects/' + data, ignoreLoading).success(success).error(error)
            },
            adminProjectPUT: function (data, success, error, ignoreLoading) {
                httpService.put(baseUrl + '/admin/projects/' + data.id, data, ignoreLoading).success(success).error(error);
            },
            adminDeleteProject: function (id, data, success, error, ignoreLoading) {
                httpService.post(baseUrl + '/admin/projects/' + id + '/delete', data, ignoreLoading).success(success).error(error)
            }
        };
    }
})();
