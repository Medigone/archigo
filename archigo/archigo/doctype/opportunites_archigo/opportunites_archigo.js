// Copyright (c) 2024, MEDIGO ONE and contributors
// For license information, please see license.txt

frappe.ui.form.on("Opportunites Archigo", {
    refresh(frm) {
        // Ceci est correct pour un calcul initial, mais considérez d'autres événements pour les mises à jour dynamiques.
    },
    surface(frm) {
        calculate_and_update(frm);
    },
    cout_m2(frm) {
        calculate_and_update(frm);
    }
});

function calculate_and_update(frm) {
    if(frm.doc.surface && frm.doc.cout_m2) {
        const montant_projet_proj = frm.doc.surface * frm.doc.cout_m2;
        frm.set_value("montant_projet_proj", montant_projet_proj);
    }
}

frappe.ui.form.on('Opportunites Archigo', {
    refresh(frm) {
        // Ajoute le bouton au groupe "Créer"
        frm.add_custom_button('Proposition', function() {
            // Logique de création de la proposition
            frappe.call({
                method: 'archigo.archigo.doctype.opportunites_archigo.opportunites_archigo.creer_proposition',
                args: {source_name: frm.doc.name},
                callback: function(r) {
                    if(r.message) {
                        frappe.msgprint('Proposition créée avec succès: ' + r.message);
                        // Optionnel : ouvrir le nouveau document
                        frappe.set_route('Form', 'Proposition', r.message);
                    }
                }
            });
        }, 'Créer');
    }
});

