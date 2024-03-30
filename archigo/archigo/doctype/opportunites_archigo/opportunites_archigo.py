# Copyright (c) 2024, MEDIGO ONE and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _

class OpportunitesArchigo(Document):
    def validate(self):
        self.montant_projet_proj = self.surface * self.cout_m2


@frappe.whitelist()
def creer_proposition(source_name):
    exists = frappe.db.exists('Proposition', {'opportunite': source_name})
    
    if exists:
        # Le document existe déjà, retourne un message spécifique
        return {
            'message': 'Une proposition pour cette opportunité existe déjà.',
            'name': exists
        }
    
    # Si le document n'existe pas, on crée un nouveau document
    doc_source = frappe.get_doc('Opportunites Archigo', source_name)
    new_doc = frappe.new_doc('Proposition')
    new_doc.client = doc_source.client
    new_doc.opportunite = doc_source.name
    new_doc.date_echeance = doc_source.date_echeance
    new_doc.save()
    frappe.db.commit()
    
    # Retourne un message indiquant que le document a été créé avec succès
    return {
    'message': 'Proposition créée avec succès.',  # ou 'Une proposition pour cette opportunité existe déjà.'
    'name': new_doc.name  # Nom du document créé ou existant
}

@frappe.whitelist()
def sur_annulation_opportunite(doc, method):
    # Affiche un message lorsque l'opportunité est annulée
    message = _("L'opportunité {0} a été annulée. Veuillez vérifier la proposition liée.").format(doc.name)
    frappe.msgprint(message)

