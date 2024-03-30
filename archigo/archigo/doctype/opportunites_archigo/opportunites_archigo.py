# Copyright (c) 2024, MEDIGO ONE and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class OpportunitesArchigo(Document):
    def validate(self):
        self.montant_projet_proj = self.surface * self.cout_m2


@frappe.whitelist()
def creer_proposition(source_name):
    # Vérifie si un document Proposition avec le même nom d'opportunité existe déjà
    exists = frappe.db.exists('Proposition', {'opportunite': source_name})
    
    if exists:
        # Retourne un message indiquant que le document existe déjà
        return {'message': 'Une proposition pour cette opportunité existe déjà.', 'name': exists}

    doc_source = frappe.get_doc('Opportunites Archigo', source_name)
    # Logique pour créer le document Proposition si non existant
    new_doc = frappe.new_doc('Proposition')
    new_doc.client = doc_source.client
    new_doc.opportunite = doc_source.name
    new_doc.date_echeance = doc_source.date_echeance
    new_doc.save()
    frappe.db.commit()
    
    # Retourne le nom du nouveau document créé
    return new_doc.name

