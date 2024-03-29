// Copyright (c) 2024, MEDIGO ONE and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Proposition", {
// 	refresh(frm) {

// 	},
// });
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
    const promises = frm.doc.table_honoraires.map(d => {
        let total = d.pct * frm.doc.montant_projet_proj / 100;
        return frappe.model.set_value(d.doctype, d.name, 'total', total);
    });

    Promise.all(promises).then(() => {
        updateParentTotal(frm);
    });
}
frappe.ui.form.on('Proposition', {
    montant_projet_proj(frm) {
        // Ici, nous supposons que le nom du champ de table est 'table_honoraires'
        // Remplacez 'table_honoraires' par le nom réel de votre champ de table
        const lignes = frm.doc.table_honoraires || [];
        
        lignes.forEach(d => {
            // Exemple de recalcul, remplacez 'pct' et 'total' par vos champs réels
            const total = d.pct * frm.doc.montant_projet_proj / 100;
            frappe.model.set_value(d.doctype, d.name, 'total', total);
        });

        // Après la mise à jour de toutes les lignes, rafraîchir la table pour refléter les changements
        frm.refresh_field('table_honoraires');
        
        // Mettez à jour le total dans le document parent si nécessaire
        updateParentTotal(frm);
    }
});

function updateParentTotal(frm) {
    let total_honoraires = 0;
    frm.doc.table_honoraires.forEach(d => total_honoraires += d.total);
    frm.set_value('total_honoraires_proj', total_honoraires);
    frm.refresh_field('total_honoraires_proj');
}

frappe.ui.form.on('Honoraires Opportunite', {
    table_honoraires_remove: function(frm, cdt, cdn) {
        var total_honoraires = 0;
        frm.doc.table_honoraires.forEach(function(d) {
            total_honoraires += d.total || 0; // Assurez-vous que 'total' est le champ correct
        });
        frm.set_value("total_honoraires_proj", total_honoraires);
        frm.refresh_field("total_honoraires_proj");
    }
});

frappe.ui.form.on('Honoraires Opportunite', {
    validate: function(frm) {
        // Vérifie l'unicité lors de la sauvegarde et empêche la sauvegarde si nécessaire
        const isUnique = validate_unique_phase(frm, true);
        if (!isUnique) {
            frappe.validated = false;
            frappe.msgprint(__('Les valeurs du champ "phase" doivent être uniques. Veuillez corriger les doublons avant de sauvegarder.'));
        }
    },
    table_honoraires_add: function(frm, cdt, cdn) {
        validate_unique_phase(frm);
    },
    table_honoraires_remove: function(frm, cdt, cdn) {
        validate_unique_phase(frm);
    },
    phase: function(frm, cdt, cdn) {
        validate_unique_phase(frm);
    }
});

function validate_unique_phase(frm, preventSave = false) {
    let phases = frm.doc.table_honoraires.map(row => row.phase);
    let uniquePhases = [...new Set(phases)];

    if (phases.length !== uniquePhases.length) {
        // S'il y a des doublons et que preventSave est false, effacez la dernière entrée ajoutée/modifiée
        if (!preventSave) {
            let lastIdx = phases.lastIndexOf(phases.find((item, idx) => phases.indexOf(item) !== idx));
            let row = frm.doc.table_honoraires[lastIdx];
            frappe.model.set_value(row.doctype, row.name, 'phase', null);
            frappe.msgprint(__('La valeur du champ "phase" doit être unique. Le doublon a été supprimé.'));
        }
        return false;
    }
    return true;
}




