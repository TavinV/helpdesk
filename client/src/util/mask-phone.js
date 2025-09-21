export default function maskPhone(value) {
    if (!value) return "";

    // Remove tudo que não for número
    value = value.replace(/\D/g, "");

    // Limita a 11 dígitos (DDD + telefone)
    value = value.substring(0, 11);

    // Formata: (XX) XXXXX-XXXX
    if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    }

    return value;
}
