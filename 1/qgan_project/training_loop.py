
import pennylane as qml
from pennylane import numpy as np
import torch
from torch import nn, optim
import matplotlib.pyplot as plt

# Import the Quantum Generator and Classical Discriminator
from quantum_generator import QuantumGenerator
from classical_discriminator import ClassicalDiscriminator

# Device configuration
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Hyperparameters
epochs = 500
batch_size = 32
learning_rate = 0.001

# Initialize models
generator = QuantumGenerator().to(device)
discriminator = ClassicalDiscriminator().to(device)

# Loss function and optimizers
criterion = nn.BCELoss()
g_optimizer = optim.Adam(generator.parameters(), lr=learning_rate)
d_optimizer = optim.Adam(discriminator.parameters(), lr=learning_rate)

# Synthetic Real Data Source (e.g., a Gaussian distribution)
def generate_real_data(num_samples):
    mean = torch.tensor([0.5, 0.5, 0.5, 0.5])
    std = torch.tensor([0.1, 0.1, 0.1, 0.1])
    return (torch.randn(num_samples, 4) * std + mean).to(device)

# Training Loop
def train_qgan():
    g_losses = []
    d_losses = []

    for epoch in range(epochs):
        # Train Discriminator
        discriminator.zero_grad()

        # Real data
        real_data = generate_real_data(batch_size)
        real_labels = torch.ones(batch_size, 1).to(device)
        d_output_real = discriminator(real_data)
        d_loss_real = criterion(d_output_real, real_labels)
        d_loss_real.backward()

        # Fake data from Generator
        noise = torch.rand(batch_size, 4).to(device)
        fake_data = generator(noise)
        fake_labels = torch.zeros(batch_size, 1).to(device)
        d_output_fake = discriminator(fake_data.detach()) # Detach to prevent generator from training on this step
        d_loss_fake = criterion(d_output_fake, fake_labels)
        d_loss_fake.backward()

        d_loss = d_loss_real + d_loss_fake
        d_optimizer.step()

        # Train Generator
        generator.zero_grad()
        noise = torch.rand(batch_size, 4).to(device)
        fake_data = generator(noise)
        g_output = discriminator(fake_data)
        g_loss = criterion(g_output, real_labels) # Generator tries to fool discriminator into thinking fake data is real
        g_loss.backward()
        g_optimizer.step()

        g_losses.append(g_loss.item())
        d_losses.append(d_loss.item())

        if (epoch + 1) % 50 == 0:
            print(f"Epoch [{epoch+1}/{epochs}], D Loss: {d_loss.item():.4f}, G Loss: {g_loss.item():.4f}")

    # Plotting function
    plt.figure(figsize=(10, 5))
    plt.plot(g_losses, label='Generator Loss')
    plt.plot(d_losses, label='Discriminator Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.title('QGAN Training Loss')
    plt.legend()
    plt.savefig('qgan_loss.png')
    plt.show()

    # Visualize Real Data vs Quantum Generated Data
    with torch.no_grad():
        generated_samples = generator(torch.rand(100, 4).to(device)).cpu().numpy()
        real_samples = generate_real_data(100).cpu().numpy()

    plt.figure(figsize=(10, 5))
    plt.scatter(real_samples[:, 0], real_samples[:, 1], label='Real Data', alpha=0.6)
    plt.scatter(generated_samples[:, 0], generated_samples[:, 1], label='Generated Data', alpha=0.6)
    plt.title('Real vs Generated Data (First two dimensions)')
    plt.xlabel('Dimension 1')
    plt.ylabel('Dimension 2')
    plt.legend()
    plt.savefig('qgan_generated_data.png')
    plt.show()

if __name__ == '__main__':
    train_qgan()
