#!/bin/bash
# Script Protractor e2e

echo "Voulez-vous lancer ce scenario ?"
select yn in "1 --> Oui" "2 --> Non"; do
    case "$yn" in
        O) protractor Cust_create_project.js && protractor Cust_add_pro_contact.js; break;;
        N) exit;;
    esac
done



