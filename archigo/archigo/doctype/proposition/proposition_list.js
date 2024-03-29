frappe.listview_settings['Proposition'] = {
    get_indicator(doc) {
        // customize indicator color
        if (doc.status == "Nouveau") {
            return [__("Nouveau"), "blue", "status,=,Nouveau"];
        } else if (doc.status == "En Cours") {
            return [__("En Cours"), "orange", "status,=,En Cours"];
        } else if (doc.status == "En Pause") {
            return [__("En Pause"), "purple", "status,=,En Pause"]; 
        } else if (doc.status == "Envoyée") {
            return [__("Envoyée"), "yellow", "status,=,Envoyée"];   
        } else if (doc.status == "Gagnée") {
            return [__("Gagnée"), "green", "status,=,Gagnée"];
        } else {
            return [__("Perdue"), "red", "status,=,Perdue"];
        }
    },

    hide_name_column: true,
}