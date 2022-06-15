{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  buildInputs = [
    pkgs.nodePackages.npm
    pkgs.nodejs
    pkgs.nodePackages.serve
  ];
}
