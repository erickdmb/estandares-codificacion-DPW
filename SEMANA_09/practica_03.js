try { let x = 10 / 0; } catch(e) { console.log(e); }

try {
    let x = 10 / 0;
} catch (error) {
    console.log("Error: " + error);
}


try {}
catch (error) {
    console.log("Error");
}


try{}
catch (error) {
    console.log("Error: No se pudo calcular la división. Verifica los números ingresados.");
}

