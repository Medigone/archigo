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