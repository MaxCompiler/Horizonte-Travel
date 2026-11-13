import { Injectable, signal } from '@angular/core';

interface CuentaRegistrada {
  nombre: string;
  usuario: string;
  sal: string;
  hash: string;
}

type ResultadoRegistro = { correcto: boolean; mensaje: string };

/**
 * DEMOSTRACIÓN ACADÉMICA: la cuenta de ejemplo está declarada en este servicio.
 * Los nuevos registros se guardan solo en ESTE navegador, sin servidor.
 * Se deriva un hash PBKDF2 para evitar almacenar las claves nuevas en texto plano.
 * Para un sistema real se requiere API, base de datos y autenticación del lado del servidor.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  public usuarioValido = 'roy';
  public claveValida = 'Travel2026';
  public nombreMostrado = 'Roy Gómez';

  public usuarioAutenticado = signal<string | null>(null);
  public nombreAutenticado = signal<string | null>(null);

  private readonly claveAlmacenamiento = 'horizonte-travel-usuarios-v1';

  public async iniciarSesion(usuario: string, clave: string): Promise<boolean> {
    const cuenta = usuario.trim().toLowerCase();
    if (cuenta === this.usuarioValido && clave === this.claveValida) {
      this.establecerSesion(this.usuarioValido, this.nombreMostrado);
      return true;
    }

    const encontrada = this.leerCuentas().find(item => item.usuario === cuenta);
    if (!encontrada) {
      return false;
    }

    const hash = await this.derivarClave(clave, encontrada.sal);
    if (hash !== encontrada.hash) {
      return false;
    }

    this.establecerSesion(encontrada.usuario, encontrada.nombre);
    return true;
  }

  public async registrarUsuario(
    nombre: string,
    usuario: string,
    clave: string,
    confirmarClave: string
  ): Promise<ResultadoRegistro> {
    const nombreLimpio = nombre.trim().replace(/\s+/g, ' ');
    const cuenta = usuario.trim().toLowerCase();

    if (nombreLimpio.length < 2 || nombreLimpio.length > 60) {
      return { correcto: false, mensaje: 'Escribe un nombre de entre 2 y 60 caracteres.' };
    }
    if (!/^[a-z0-9_]{3,20}$/.test(cuenta)) {
      return { correcto: false, mensaje: 'El usuario debe tener entre 3 y 20 caracteres: letras, números o guion bajo.' };
    }
    if (clave.length < 8) {
      return { correcto: false, mensaje: 'La contraseña debe tener al menos 8 caracteres.' };
    }
    if (clave !== confirmarClave) {
      return { correcto: false, mensaje: 'Las contraseñas no coinciden.' };
    }
    if (cuenta === this.usuarioValido || this.leerCuentas().some(item => item.usuario === cuenta)) {
      return { correcto: false, mensaje: 'Ese nombre de usuario ya está registrado.' };
    }

    const sal = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(byte => byte.toString(16).padStart(2, '0')).join('');
    const hash = await this.derivarClave(clave, sal);
    const cuentas = this.leerCuentas();
    cuentas.push({ nombre: nombreLimpio, usuario: cuenta, sal, hash });

    try {
      localStorage.setItem(this.claveAlmacenamiento, JSON.stringify(cuentas));
      return { correcto: true, mensaje: 'Cuenta creada correctamente. Ya puedes iniciar sesión.' };
    } catch {
      return { correcto: false, mensaje: 'No se pudo guardar la cuenta. Comprueba que el navegador permita almacenamiento local.' };
    }
  }

  public cerrarSesion(): void {
    this.usuarioAutenticado.set(null);
    this.nombreAutenticado.set(null);
  }

  public estaAutenticado(): boolean {
    return this.usuarioAutenticado() !== null;
  }

  private establecerSesion(usuario: string, nombre: string): void {
    this.usuarioAutenticado.set(usuario);
    this.nombreAutenticado.set(nombre);
  }

  private leerCuentas(): CuentaRegistrada[] {
    try {
      const valor = localStorage.getItem(this.claveAlmacenamiento);
      if (!valor) return [];
      const datos: unknown = JSON.parse(valor);
      if (!Array.isArray(datos)) return [];
      return datos.filter((item): item is CuentaRegistrada =>
        typeof item === 'object' && item !== null &&
        typeof item.nombre === 'string' &&
        typeof item.usuario === 'string' &&
        typeof item.sal === 'string' &&
        typeof item.hash === 'string'
      );
    } catch {
      return [];
    }
  }

  private async derivarClave(clave: string, salHex: string): Promise<string> {
    const codificador = new TextEncoder();
    const sal = new Uint8Array(
      (salHex.match(/.{1,2}/g) || []).map(par => Number.parseInt(par, 16))
    );
    const claveBase = await crypto.subtle.importKey(
      'raw', codificador.encode(clave), 'PBKDF2', false, ['deriveBits']
    );
    const resultado = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', salt: sal, iterations: 120000, hash: 'SHA-256' },
      claveBase,
      256
    );
    return Array.from(new Uint8Array(resultado))
      .map(byte => byte.toString(16).padStart(2, '0')).join('');
  }
}
