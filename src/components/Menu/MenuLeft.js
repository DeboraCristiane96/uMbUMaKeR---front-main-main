import React from "react";

import "../Menu/Menu.css";

import { Menu } from "primereact/menu";

//falta fazer a logica do botão ficar
//branco e selecionado quando a pagina estiver aberta
//ver como vai ser a logica da transição de paginas

export default function MenuLeft() {
  let items = [
    {
      items: [
        {
          label: "DASHBOARDS",
          command: () => {
            window.location.hash = "/fileupload";
          },
        },
        {
          label: "INSUMOS",
          command: () => {
            window.location.hash = "/fileupload";
          },
        },
        {
          label: "ZONAS",
          command: () => {
            window.location.hash = "/fileupload";
          },
        },
        {
          label: "DISPOSITIVOS",
          command: () => {
            window.location.href = "/devices";
          },
        },
        {
          label: "ASSOCIADOS",
          command: () => {
            window.location.href = "/associates";
          },
        },
        {
          label: "SAIR",
          command: () => {
            window.location.href = "/";
          },
        },
      ],
    },
  ];

  return (
    <div className="menu">
      <div className="logo">
        <a href="/">
          <img src="logo.png" alt="Logo-Umbumaker" />
        </a>
      </div>
      <Menu model={items} orientation="vertical" breakpoint="767px" />
    </div>
  );
}
