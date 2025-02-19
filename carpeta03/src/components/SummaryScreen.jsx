import React, { useState } from "react";

function SummaryScreen({ scannedCodes, playerName, onRestart }) {
  const [verificationResult, setVerificationResult] = useState(null);

  // Mapeo de índice a tipo de carta (para los títulos)
  const cardTypeMapping = {
    0: "Carta de contexto",
    1: "Carta de problema",
    2: "Carta de solución",
    3: "Carta de insight",
  };

  /* 
    Definimos un objeto de validación que utiliza el contexto, el problema y el insight
    para establecer cuáles son las soluciones válidas.
    Las claves son las descripciones (transformadas) que se muestran en cada carta.
    Por ejemplo, para el contexto "usuario en movimiento", el problema "botones pequeños e incómodos"
    y el insight "el usuario repite siempre la misma acción", la solución válida es "agrandar botones y aumentar espacios".
    Puedes definir tantas combinaciones como necesites.
  */
  const validMapping = {
    "usuario en movimiento": {
      "botones pequeños e incómodos": {
        "el usuario repite siempre la misma acción": [
          "agrandar botones y aumentar espacios",
        ],
        "el usuario usa la app con una mano sola": [
          "agrandar botones y aumentar espacios",
          "introducir accesos rápidos y personalizados",
        ],
      },
      "interfaz sobrecargada": {
        "el usuario repite siempre la misma acción": [
          "simplificar la interfaz eliminando elementos",
        ],
        "el usuario usa la app con una mano sola": [
          "simplificar la interfaz eliminando elementos",
        ],
      },
    },
    "dispositivo pequeño": {
      "interfaz sobrecargada": {
        "test de usabilidad revela confusión en el menú": [
          "simplificar la interfaz eliminando elementos",
        ],
        "los usuarios prefieren una interfaz más simple": [
          "simplificar la interfaz eliminando elementos",
          "mejorar el contraste y la legibilidad",
        ],
      },
      "falta de feedback al usuario": {
        "test de usabilidad revela confusión en el menú": [
          "mejorar el contraste y la legibilidad",
        ],
        "los usuarios prefieren una interfaz más simple": [
          "mejorar el contraste y la legibilidad",
        ],
      },
    },
    "ambiente con mala conexión": {
      "menú resulta muy confuso": {
        "la mayoría prefiere controles por voz": ["agregar comandos por voz"],
        "los usuarios prefieren una interfaz más simple": [
          "agregar comandos por voz",
        ],
      },
    },
    "ambiente con luz intensa": {
      "falta de feedback al usuario": {
        "test de usabilidad revela confusión en el menú": [
          "mejorar el contraste y la legibilidad",
        ],
        "los usuarios prefieren una interfaz más simple": [
          "mejorar el contraste y la legibilidad",
        ],
      },
    },
  };

  const handleVerify = () => {
    const context = scannedCodes[0];
    const problem = scannedCodes[1];
    const solution = scannedCodes[2];
    const insight = scannedCodes[3];

    const validSolutions = validMapping[context]?.[problem]?.[insight] || [];
    if (validSolutions.includes(solution)) {
      setVerificationResult("¡Solución correcta!");
    } else {
      setVerificationResult("Solución incorrecta. Revisa tus cartas.");
    }
  };

  return (
    <div className="summary-screen">
      <h2 className="resultsTitle">Resumen de {playerName}</h2>
      <h3>Cartas escaneadas</h3>
      {scannedCodes.map((code, index) => (
        <div key={index} className="summary-card">
          <h3 className={`card-type step${index + 1}`}>
            {cardTypeMapping[index] || "Carta"}
          </h3>
          <h4 className="card-content">{code}</h4>
        </div>
      ))}
      <button className="verify-button" onClick={handleVerify}>
        Verificar solución
      </button>
      {verificationResult && (
        <p className="verification-result">{verificationResult}</p>
      )}
      {onRestart && <button onClick={onRestart}>Reiniciar</button>}
    </div>
  );
}

export default SummaryScreen;
