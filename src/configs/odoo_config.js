import OdooAwait from "odoo-await";

const odoo = new OdooAwait({
    baseUrl: "https://vvcodoo.io.vn/",
    // baseUrl: "http://127.0.0.1",
    // port: 8069, // see comments below regarding port option
    db: "vvcgreendb",
    username: "vvctech@gmail.com",
    password: "Caocuong297@",
});

export default odoo
