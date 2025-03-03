// pedidoService.ts
export interface ProductoPedido {
  id_producto: number;
  cantidad_producto: number;
}

export interface PedidoPayload {
  productos: ProductoPedido[];
  id_cliente: number;
}

export const realizarPago = async (payload: PedidoPayload) => {
  try {
    const response = await fetch("http://localhost:3000/api/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Error al procesar el pedido");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
