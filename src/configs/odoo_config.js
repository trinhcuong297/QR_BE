import OdooAwait from "odoo-await";

const odoo = new OdooAwait({
    baseUrl: "http://195.35.23.226",
    port: 8069, // see comments below regarding port option
    db: "vvcgreendb",
    username: "vvctech@gmail.com",
    password: "Caocuong297@",
});

export default odoo
