import { Kingdom } from '../types';

export const kingdoms: Kingdom[] = [
  {
    id: 'fundamentals',
    name: 'Kingdom of Fundamentals',
    description: 'Master the basics: variables, data types, operators, and control structures',
    icon: 'BookOpen',
    difficulty: 'beginner',
    isUnlocked: true,
    progress: 0,
    totalXp: 500,
    lessons: [
      {
        id: 'variables',
        title: 'Variables and Data Types',
        description: 'Learn about Java variables, primitive types, and memory management',
        content: `# Variables and Data Types in Java

In Java, variables are containers that store data values. Think of them as labeled boxes where you can store different types of information.

## Primitive Data Types

Java has 8 primitive data types:

### Numeric Types
- **byte**: 8-bit signed integer (-128 to 127)
- **short**: 16-bit signed integer (-32,768 to 32,767)
- **int**: 32-bit signed integer (-2^31 to 2^31-1)
- **long**: 64-bit signed integer (-2^63 to 2^63-1)
- **float**: 32-bit floating point
- **double**: 64-bit floating point

### Other Types
- **char**: 16-bit Unicode character
- **boolean**: true or false

## Variable Declaration

Variables must be declared before use:

\`\`\`java
int age;           // Declaration
age = 25;          // Assignment
int score = 100;   // Declaration + Assignment
\`\`\`

## Best Practices
- Use meaningful names: \`studentAge\` instead of \`a\`
- Follow camelCase convention
- Initialize variables before use
- Choose appropriate data types`,
        codeExample: `public class VariablesExample {
    public static void main(String[] args) {
        // Numeric variables
        int health = 100;
        double damage = 15.5;
        long experience = 1250000L;
        
        // Character and boolean
        char grade = 'A';
        boolean isAlive = true;
        
        // String (reference type)
        String playerName = "CodeWarrior";
        
        System.out.println("Player: " + playerName);
        System.out.println("Health: " + health);
        System.out.println("Damage: " + damage);
        System.out.println("Experience: " + experience);
        System.out.println("Grade: " + grade);
        System.out.println("Is Alive: " + isAlive);
    }
}`,
        challenges: [],
        xpReward: 50,
        estimatedTime: 15
      }
    ]
  },
  {
    id: 'oop-basics',
    name: 'Realm of Objects',
    description: 'Enter the world of Object-Oriented Programming: classes, objects, and methods',
    icon: 'Boxes',
    difficulty: 'intermediate',
    isUnlocked: false,
    progress: 0,
    totalXp: 750,
    lessons: []
  },
  {
    id: 'inheritance',
    name: 'Dynasty of Inheritance',
    description: 'Master inheritance, polymorphism, and the power of code reusability',
    icon: 'GitBranch',
    difficulty: 'intermediate',
    isUnlocked: false,
    progress: 0,
    totalXp: 600,
    lessons: []
  },
  {
    id: 'collections',
    name: 'Archive of Collections',
    description: 'Organize data with Lists, Sets, Maps, and advanced collection operations',
    icon: 'Database',
    difficulty: 'intermediate',
    isUnlocked: false,
    progress: 0,
    totalXp: 550,
    lessons: []
  },
  {
    id: 'exceptions',
    name: 'Fortress of Exception Handling',
    description: 'Defend your code against errors and handle exceptions gracefully',
    icon: 'Shield',
    difficulty: 'advanced',
    isUnlocked: false,
    progress: 0,
    totalXp: 400,
    lessons: []
  },
  {
    id: 'advanced',
    name: 'Temple of Advanced Concepts',
    description: 'Explore generics, lambdas, streams, and advanced Java features',
    icon: 'Zap',
    difficulty: 'advanced',
    isUnlocked: false,
    progress: 0,
    totalXp: 800,
    lessons: []
  }
];