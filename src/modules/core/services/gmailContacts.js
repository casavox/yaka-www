angular.module('Yaka')
    .factory('gmailContacts', function (alertMsg, $translate, CONFIG) {
        return {
            getGmailContacts: function (onLoaded) {

                var clientId = CONFIG.GOOGLE_CLIENT_ID;
                var apiKey = CONFIG.GOOGLE_API_KEY;
                var scopes = 'https://www.googleapis.com/auth/contacts.readonly';

                gapi.client.setApiKey(apiKey);
                window.setTimeout(authorize);

                function authorize() {
                    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthorization);
                }

                function handleAuthorization(authorizationResult) {
                    if (authorizationResult && !authorizationResult.error) {
                        $.get("https://www.google.com/m8/feeds/contacts/default/thin?alt=json&access_token=" + authorizationResult.access_token + "&max-results=1000000&v=3.0",
                            function (response) {
                                if (!response || !response.feed || !response.feed.entry || response.feed.entry.length <= 0) {
                                    alertMsg.send("Impossible de récupérer vos contacts depuis Google", 'danger');
                                }
                                var emails = [];
                                var id = 1;
                                if (response.feed.entry) {
                                    for (var i = 0; i < response.feed.entry.length; ++i) {
                                        var item = response.feed.entry[i];
                                        if (item.gd$email) {
                                            for (var j = 0; j < item.gd$email.length; ++j) {
                                                email = item.gd$email[j];
                                                if (email.primary && email.primary == "true") {
                                                    if (item.gd$name && item.gd$name.gd$fullName && item.gd$name.gd$fullName.$t) {
                                                        emails.push({
                                                            id: id,
                                                            address: email.address,
                                                            name: item.gd$name.gd$fullName.$t,
                                                            selected: false
                                                        });
                                                    } else {
                                                        emails.push({
                                                            id: id,
                                                            address: email.address,
                                                            selected: false
                                                        });
                                                    }
                                                    ++id;
                                                }
                                            }
                                        }
                                    }
                                }
                                onLoaded(_.sortBy(_.uniq(emails), 'name', 'email'));
                            });
                    }
                }
            }
        };
    });
