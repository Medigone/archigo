// Copyright (c) 2024, MEDIGO ONE and contributors
// For license information, please see license.txt

frappe.listview_settings['Opportunites Archigo'] = {
    get_indicator(doc) {
        // customize indicator color
        if (doc.status == "Nouveau") {
            return [__("Nouveau"), "blue", "status,=,Nouveau"];
        } else if (doc.status == "En Cours") {
            return [__("En Cours"), "orange", "status,=,En Cours"];
        } else if (doc.status == "Gagnée") {
            return [__("Gagnée"), "green", "status,=,Gagnée"];
        } else {
            return [__("Perdue"), "red", "status,=,Perdue"];
        }
    },
}
