# Copyright (c) 2024, MEDIGO ONE and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class OpportunitesArchigo(Document):
	def validate(self):
		montant_projet_proj = 0
		self.montant_projet_proj = self.surface * self.cout_m2
