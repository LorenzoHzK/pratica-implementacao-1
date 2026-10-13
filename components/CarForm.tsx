import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import FormButton from "./FormButton";
import FormInput from "./FormInput";

interface FormErrors {
  modelo?: string;
  marca?: string;
  ano?: string;
  placa?: string;
}

export default function CarForm() {
  const [modelo, setModelo] = useState<string>("");
  const [marca, setMarca] = useState<string>("");
  const [ano, setAno] = useState<string>("");
  const [placa, setPlaca] = useState<string>("");
  const [aceitaTermos, setAceitaTermos] = useState<boolean>(false);

  const [errors, setErrors] = useState<FormErrors>({});

  const [loading, setLoading] = useState<boolean>(true);
  const [formValido, setFormValido] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setFormValido(
      !validarModelo(modelo) &&
        !validarMarca(marca) &&
        !validarAno(ano) &&
        !validarPlaca(placa) &&
        aceitaTermos,
    );
  }, [modelo, marca, ano, placa, aceitaTermos]);

  const handleModelo = (text: string) => {
    setModelo(text);
    setErrors({ ...errors, modelo: validarModelo(text) });
  };

  const handleMarca = (text: string) => {
    setMarca(text);
    setErrors({ ...errors, marca: validarMarca(text) });
  };

  const handleAno = (text: string) => {
    setAno(text);
    setErrors({ ...errors, ano: validarAno(text) });
  };

  const handlePlaca = (text: string) => {
    setPlaca(text);
    setErrors({ ...errors, placa: validarPlaca(text) });
  };

  const onSubmit = () => {
    console.log("Cadastro de Carro:", {
      modelo,
      marca,
      ano: Number(ano),
      placa: placa.toUpperCase(),
      aceitaTermos,
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {loading && (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Sistema Carregado...</Text>
        </View>
      )}

      <View style={styles.header}>
        <Image
          source={require("../assets/car.jpg")}
          style={styles.banner}
          resizeMode="cover"
        />
        <Text style={styles.title}>Cadastro de Carro</Text>
        <Text style={styles.subtitle}>Preencha os dados do seu veículo</Text>
      </View>

      <View style={styles.form}>
        <FormInput
          label="Modelo"
          placeholder="Ex: Onix"
          value={modelo}
          onChangeText={handleModelo}
          error={errors.modelo}
        />

        <FormInput
          label="Marca"
          placeholder="Ex: Chevrolet"
          value={marca}
          onChangeText={handleMarca}
          error={errors.marca}
        />

        <FormInput
          label="Ano"
          placeholder="Ex: 2020"
          keyboardType="numeric"
          maxLength={4}
          value={ano}
          onChangeText={handleAno}
          error={errors.ano}
        />

        <FormInput
          label="Placa"
          placeholder="Ex: ABC1D23"
          autoCapitalize="characters"
          maxLength={8}
          value={placa}
          onChangeText={handlePlaca}
          error={errors.placa}
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Aceito os termos de uso</Text>
          <Switch
            value={aceitaTermos}
            onValueChange={setAceitaTermos}
            trackColor={{ true: "#fdba74", false: "#d1d5db" }}
            thumbColor={aceitaTermos ? "#f97316" : "#f9fafb"}
          />
        </View>

        <FormButton
          title="Cadastrar"
          disabled={!formValido}
          onPress={onSubmit}
        />
      </View>
    </ScrollView>
  );
}

function validarModelo(value: string) {
  if (value.trim().length < 2) return "O modelo deve ter pelo menos 2 letras.";
}

function validarMarca(value: string) {
  if (!value.trim()) return "Informe a marca.";
}

function validarAno(value: string) {
  const n = Number(value);
  const anoMaximo = new Date().getFullYear() + 1;
  if (!value || !Number.isInteger(n) || n < 1900 || n > anoMaximo)
    return `Informe um ano válido (1900 a ${anoMaximo}).`;
}

function validarPlaca(value: string) {
  if (!/^[A-Z]{3}-?\d[A-Z0-9]\d{2}$/i.test(value.trim()))
    return "Informe uma placa válida (ABC1234 ou ABC1D23).";
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 24,
  },
  loading: {
    backgroundColor: "#dcfce7",
    padding: 12,
    borderRadius: 10,
  },
  loadingText: {
    color: "#166534",
    fontWeight: "600",
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    gap: 6,
  },
  banner: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  form: {
    gap: 16,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchLabel: {
    fontSize: 14,
    color: "#374151",
  },
});
