import React from "react";

export type Color = "blue" | "red" | "orange" | "green" | "gray" | "pink" | "purple" | "yellow";

export type Label = {
  value: string;
  placeholder?: string;
  color?: Color;
};

export type ContainerType = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}