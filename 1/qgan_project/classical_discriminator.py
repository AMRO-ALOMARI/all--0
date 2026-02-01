
import torch
from torch import nn

class ClassicalDiscriminator(nn.Module):
    def __init__(self, input_size=4):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_size, 32),
            nn.LeakyReLU(0.2),
            nn.Linear(32, 16),
            nn.LeakyReLU(0.2),
            nn.Linear(16, 1),
            nn.Sigmoid()
        )

    def forward(self, x):
        return self.network(x)

if __name__ == '__main__':
    # Test the Classical Discriminator
    discriminator = ClassicalDiscriminator()
    # Input: (batch_size, input_size)
    test_input = torch.rand(1, 4)
    output = discriminator(test_input)
    print("Classical Discriminator Output Shape:", output.shape)
    print("Classical Discriminator Output:", output)
