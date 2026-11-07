import test from 'node:test'
import assert from 'node:assert/strict'
import {crearEstadoInicial,inventarioReducer,ACCIONES} from '../src/context/inventarioReducer.js'
const base=[{id:'a',stock:2},{id:'b',stock:0}]
test('agregar al carrito descuenta una unidad del inventario',()=>{const s=inventarioReducer(crearEstadoInicial(base),{type:ACCIONES.AGREGAR_CARRITO,id:'a'});assert.equal(s.productos[0].stock,1);assert.deepEqual(s.carrito,[{productoId:'a',cantidad:1}])})
test('no permite agregar productos sin stock',()=>{const inicial=crearEstadoInicial(base);assert.equal(inventarioReducer(inicial,{type:ACCIONES.AGREGAR_CARRITO,id:'b'}),inicial)})
test('aumentar cantidad descuenta stock y disminuir lo devuelve',()=>{let s=crearEstadoInicial(base);s=inventarioReducer(s,{type:ACCIONES.AGREGAR_CARRITO,id:'a'});s=inventarioReducer(s,{type:ACCIONES.AUMENTAR,id:'a'});assert.equal(s.productos[0].stock,0);assert.equal(s.carrito[0].cantidad,2);s=inventarioReducer(s,{type:ACCIONES.DISMINUIR,id:'a'});assert.equal(s.productos[0].stock,1);assert.equal(s.carrito[0].cantidad,1)})
test('al disminuir la última unidad se elimina la línea del carrito',()=>{let s=crearEstadoInicial(base);s=inventarioReducer(s,{type:ACCIONES.AGREGAR_CARRITO,id:'a'});s=inventarioReducer(s,{type:ACCIONES.DISMINUIR,id:'a'});assert.equal(s.carrito.length,0);assert.equal(s.productos[0].stock,2)})
test('la suma de stock y unidades en carrito conserva las existencias',()=>{let s=crearEstadoInicial(base);s=inventarioReducer(s,{type:ACCIONES.AGREGAR_CARRITO,id:'a'});s=inventarioReducer(s,{type:ACCIONES.AUMENTAR,id:'a'});s=inventarioReducer(s,{type:ACCIONES.DISMINUIR,id:'a'});assert.equal(s.productos[0].stock+s.carrito.find(x=>x.productoId==='a').cantidad,2)})
