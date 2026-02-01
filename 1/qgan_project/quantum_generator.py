
import pennylane as qml
from pennylane import numpy as np
import torch
from torch.nn import Module

# Define the quantum device
dev = qml.device("default.qubit", wires=4)

@qml.qnode(dev, interface="torch")
def quantum_generator_circuit(inputs, weights):
    # Embed classical data into quantum states
    qml.AngleEmbedding(inputs, wires=range(4))

    # Strongly Entangling Layer for deep quantum correlations
    qml.StronglyEntanglingLayers(weights, wires=range(4))

    # Measure the output in the Pauli-Z basis
    return [qml.expval(qml.PauliZ(i)) for i in range(4)]

class QuantumGenerator(Module):
    def __init__(self):
        super().__init__()
        self.qnode = quantum_generator_circuit
        weight_shapes = {"weights": (3, 4, 3)} # Example shape for StronglyEntanglingLayers
        self.qlayer = qml.qnn.TorchLayer(self.qnode, weight_shapes)

    def forward(self, x):
        return self.qlayer(x)

if __name__ == '__main__':
    # Test the Quantum Generator
    generator = QuantumGenerator()
    # Input: random noise (batch_size, num_features)
    random_noise = torch.rand(1, 4)
    output = generator(random_noise)
    print("Quantum Generator Output Shape:", output.shape)
    print("Quantum Generator Output:", output)
