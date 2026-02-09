function validateForm() {
    let form = event.target;
    let phoneInput = form.querySelector('.phone');

    let phoneValue = phoneInput.value.trim();
    let digitsOnly = phoneValue.replace(/\D/g, ''); // лише цифри

    // Венгрия: +36 (XX) XXX-XXXX → 11 цифр (2 + 9 цифр)
    if (digitsOnly.length !== 11) {
        alert('Kérjük, adja meg a teljes telefonszámot, beleértve a körzetszámot is.');
        return false;
    }

    // Список дійсних венгерских area codes (основні)
    const validAreaCodes = [
        "20", "30", "31", "70"
    ];

    // Витягуємо area code з номера у форматі +36 (XX) XXX-XXXX
    let areaCodeMatch = digitsOnly.match(/^36(\d{2})\d{7}$/);

    if (areaCodeMatch && areaCodeMatch[1]) {
        let areaCode = areaCodeMatch[1];
        if (!validAreaCodes.includes(areaCode)) {
            alert('Helytelen operátor kód! Megengedett kódok: ' + validAreaCodes.join(', '));
            return false;
        }
    } else {
        alert('Kérjük, adja meg a számot a helyes formátumban: +36 (XX) XXX-XXXX');
        return false;
    }

    // Пошук ідентифікаторів полів
    let num = form.querySelector('input[name^="tel"]').name.replace('tel', '') || 1;
    let name = form.querySelector('input[name^="name"]').name.replace('name', '') || '';

    sendorder(num);
    return false;
}
