import pygame, random, math

win = pygame.display
display = win.set_mode((1200, 600))

class Circle:
    def __init__(self):
         #You can initialise the size to a random value
         self.pos = (random.randint(0, 1200), random.randint(0, 600))
         self.color = (0, 0, 0)
         self.radius = 5

    def draw(self):
         pygame.draw.circle(display, self.color, self.pos, self.radius)


circles = []
total = 10

for i in range(total):
    circles.append(Circle())

def checkIntersection(c1, c2):
    dx = c1.pos[0] - c2.pos[0]
    dy = c1.pos[1] - c2.pos[1]
    d = math.hypot(dx, dy)
    if d < c1.radius + c2.radius:
        return True
    return False


for i in range(total - 1):
    while checkIntersection(circles[i], circles[i + 1]):
        circles[i].pos = (random.randint(0, 1200), random.randint(0, 600))

positions = []
for i in range(total):
    print(circles[i].pos)
    positions.append(circles[i].pos)

pygame.draw.lines(display, (0, 0, 0), True, positions)

while True:
    display.fill((255, 255, 255))
    pygame.event.get()
    for circle in circles:
        circle.draw()
    pygame.draw.aalines(display, (0, 0, 0), True, positions)
    win.flip()