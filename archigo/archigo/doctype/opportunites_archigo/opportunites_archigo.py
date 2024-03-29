# Copyright (c) 2024, MEDIGO ONE and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class OpportunitesArchigo(Document):
    def validate(self):
        self.montant_projet_proj = self.surface * self.cout_m2


@frappe.whitelist()
def creer_proposition(source_name):
    doc_source = frappe.get_doc('Opportunites Archigo', source_name)
    # Logique pour créer le document Proposition
    new_doc = frappe.new_doc('Proposition')
    new_doc.client = doc_source.client
    new_doc.opportunite = doc_source.name
    new_doc.date_echeance = doc_source.date_echeance
    new_doc.save()
    frappe.db.commit()
    return new_doc.name
