
import pennylane as qml
from pennylane import numpy as np
import torch
import matplotlib.pyplot as plt

# Test PennyLane installation with a simple quantum device
dev = qml.device("default.qubit", wires=4)

@qml.qnode(dev)
def simple_circuit():
    qml.Hadamard(wires=0)
    qml.CNOT(wires=[0, 1])
    qml.RX(0.54, wires=2)
    qml.RY(0.12, wires=3)
    return qml.expval(qml.PauliZ(0))

print("PennyLane device created successfully:", dev)
print("Simple circuit output:", simple_circuit())

print("Libraries imported successfully: pennylane, torch, matplotlib")
