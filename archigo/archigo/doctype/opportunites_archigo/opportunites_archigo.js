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

frappe.ui.form.on('Honoraires Opportunite', {
    montant_projet_proj: function(frm) {
        recalculateChildTotals(frm);
    },
    pct: function(frm, cdt, cdn) {
        updateTotal(frm, cdt, cdn);
        updateParentTotal(frm);
    },
    // Ajoutez d'autres gestionnaires si nécessaire
});

function updateTotal(frm, cdt, cdn) {
    var child_row = locals[cdt][cdn];
    var pct = child_row.pct || 0;
    var montant_projet_proj = frm.doc.montant_projet_proj; 
    var total = pct * montant_projet_proj / 100; 
    
    frappe.model.set_value(cdt, cdn, 'total', total);
}

function updateParentTotal(frm) {
    let total_honoraires = 0;
    frm.doc.table_honoraires.forEach(d => {
        total_honoraires += d.total;
    });
    frm.set_value('total_honoraires_proj', total_honoraires);
    frm.refresh_field('total_honoraires_proj');
}

function recalculateChildTotals(frm) {
    frm.doc.table_honoraires.forEach(d => {
        // Calculez le total pour chaque ligne en utilisant la nouvelle valeur de montant_projet_proj
        let total = d.pct * frm.doc.montant_projet_proj / 100;
        frappe.model.set_value(d.doctype, d.name, 'total', total);
    });
    
    // Après la mise à jour de toutes les lignes, mettez à jour le total dans le document parent
    updateParentTotal(frm);
}
