// Robotics Course Data Structure
const courseData = {
    title: "Robotics Course",
    description: "Comprehensive introduction to robotics engineering and programming",
    units: [
        {
            id: "unit-1",
            title: "Unit 1: Introduction to Robotics",
            description: "Fundamentals of robotics, history, and basic concepts",
            lessons: [
                {
                    id: "lesson-1-1",
                    title: "Lesson 1: What is Robotics?",
                    description: "Definition and scope of robotics",
                    slides: [
                        {
                            id: "slide-1-1-1",
                            title: "Slide 1: Welcome to Robotics",
                            content: "Robotics is an interdisciplinary field that integrates computer science, engineering, and technology to create machines capable of performing tasks autonomously or with human guidance."
                        },
                        {
                            id: "slide-1-1-2",
                            title: "Slide 2: Definition of a Robot",
                            content: "A robot is a programmable machine designed to perform tasks automatically. It typically consists of sensors, actuators, and a control system that processes information and makes decisions.",
                            isAssignment: true,
                            dueDate: "2024-01-15"
                        },
                        {
                            id: "slide-1-1-3",
                            title: "Slide 3: Key Components",
                            content: "Every robot has three essential components: Sensors (to perceive the environment), Processors (to make decisions), and Actuators (to perform actions)."
                        },
                        {
                            id: "slide-1-1-4",
                            title: "Slide 4: Types of Robots",
                            content: "Robots can be classified into various categories: Industrial robots, Service robots, Military robots, Entertainment robots, and Research robots.",
                            isAssignment: true,
                            dueDate: "2024-01-20"
                        },
                        {
                            id: "slide-1-1-5",
                            title: "Slide 5: Applications Today",
                            content: "Modern robots are used in manufacturing, healthcare, space exploration, domestic assistance, and many other fields, revolutionizing how we work and live."
                        }
                    ]
                },
                {
                    id: "lesson-1-2",
                    title: "Lesson 2: History of Robotics",
                    description: "Evolution of robotics from ancient times to modern day",
                    slides: [
                        {
                            id: "slide-1-2-1",
                            title: "Slide 1: Ancient Beginnings",
                            content: "The concept of automated machines dates back to ancient civilizations. Greek myths spoke of golden servants, and ancient engineers created water-powered automatons."
                        },
                        {
                            id: "slide-1-2-2",
                            title: "Slide 2: Industrial Revolution",
                            content: "The 18th and 19th centuries brought mechanical automation to manufacturing. Steam-powered machines began replacing human labor in factories.",
                            isAssignment: true,
                            dueDate: "2024-01-15"
                        },
                        {
                            id: "slide-1-2-3",
                            title: "Slide 3: Birth of Modern Robotics",
                            content: "The term 'robot' was coined by Karel Čapek in 1920. The first programmable robot, Unimate, was installed in a General Motors factory in 1961."
                        },
                        {
                            id: "slide-1-2-4",
                            title: "Slide 4: Computer Age",
                            content: "The development of computers in the 1970s-80s enabled more sophisticated robot control systems and the emergence of artificial intelligence in robotics.",
                            isAssignment: true,
                            dueDate: "2024-01-20"
                        },
                        {
                            id: "slide-1-2-5",
                            title: "Slide 5: Modern Era",
                            content: "Today's robots feature advanced AI, machine learning, and sophisticated sensors, enabling autonomous vehicles, surgical robots, and personal assistants."
                        }
                    ]
                },
                {
                    id: "lesson-1-3",
                    title: "Lesson 3: Robot Anatomy",
                    description: "Understanding the physical structure of robots",
                    slides: [
                        {
                            id: "slide-1-3-1",
                            title: "Slide 1: Mechanical Structure",
                            content: "The mechanical structure provides the robot's physical framework. It includes the chassis, joints, links, and end-effectors that enable movement and manipulation."
                        },
                        {
                            id: "slide-1-3-2",
                            title: "Slide 2: Actuators",
                            content: "Actuators are the 'muscles' of a robot. Common types include electric motors, hydraulic cylinders, and pneumatic systems that convert energy into motion.",
                            isAssignment: true,
                            dueDate: "2024-01-20"
                        },
                        {
                            id: "slide-1-3-3",
                            title: "Slide 3: Sensors",
                            content: "Sensors are the robot's 'senses.' They include cameras, ultrasonic sensors, gyroscopes, accelerometers, and touch sensors that gather environmental data."
                        },
                        {
                            id: "slide-1-3-4",
                            title: "Slide 4: Control System",
                            content: "The control system is the robot's 'brain.' It processes sensor data, makes decisions, and sends commands to actuators using microcontrollers or computers.",
                            isAssignment: true,
                            dueDate: "2024-01-25"
                        },
                        {
                            id: "slide-1-3-5",
                            title: "Slide 5: Power System",
                            content: "Robots need power to operate. Power systems include batteries, fuel cells, or direct electrical connections, depending on the robot's application and mobility requirements."
                        }
                    ]
                },
                {
                    id: "lesson-1-4",
                    title: "Lesson 4: Types of Robots",
                    description: "Classification and categories of robots",
                    slides: [
                        {
                            id: "slide-1-4-1",
                            title: "Slide 1: Industrial Robots",
                            content: "Industrial robots are used in manufacturing for tasks like welding, painting, assembly, and material handling. They're typically large, powerful, and operate in controlled environments."
                        },
                        {
                            id: "slide-1-4-2",
                            title: "Slide 2: Service Robots",
                            content: "Service robots assist humans in various tasks. Examples include cleaning robots (Roomba), delivery robots, and robots used in hospitality and retail.",
                            isAssignment: true,
                            dueDate: "2024-01-25"
                        },
                        {
                            id: "slide-1-4-3",
                            title: "Slide 3: Medical Robots",
                            content: "Medical robots assist in surgery, rehabilitation, and patient care. Surgical robots like da Vinci enable minimally invasive procedures with enhanced precision."
                        },
                        {
                            id: "slide-1-4-4",
                            title: "Slide 4: Autonomous Vehicles",
                            content: "Self-driving cars, drones, and autonomous ships are mobile robots that navigate and operate independently using advanced sensors and AI algorithms.",
                            isAssignment: true,
                            dueDate: "2024-01-30"
                        },
                        {
                            id: "slide-1-4-5",
                            title: "Slide 5: Humanoid Robots",
                            content: "Humanoid robots are designed to resemble and interact like humans. Examples include ASIMO, Pepper, and Atlas, used for research and social interaction."
                        }
                    ]
                },
                {
                    id: "lesson-1-5",
                    title: "Lesson 5: Robot Applications",
                    description: "Real-world applications and use cases",
                    slides: [
                        {
                            id: "slide-1-5-1",
                            title: "Slide 1: Manufacturing",
                            content: "Robots revolutionized manufacturing with precision assembly, quality control, and 24/7 operation capability, increasing efficiency and reducing costs."
                        },
                        {
                            id: "slide-1-5-2",
                            title: "Slide 2: Healthcare",
                            content: "Medical robots perform surgeries, assist in rehabilitation, deliver medications, and provide companionship to elderly patients, improving healthcare outcomes.",
                            isAssignment: true,
                            dueDate: "2024-01-30"
                        },
                        {
                            id: "slide-1-5-3",
                            title: "Slide 3: Space Exploration",
                            content: "Space robots like Mars rovers, robotic arms on space stations, and satellite servicing robots enable exploration and research in environments too dangerous for humans."
                        },
                        {
                            id: "slide-1-5-4",
                            title: "Slide 4: Agriculture",
                            content: "Agricultural robots automate planting, harvesting, monitoring crop health, and applying pesticides, helping feed the growing global population efficiently.",
                            isAssignment: true,
                            dueDate: "2024-02-04"
                        },
                        {
                            id: "slide-1-5-5",
                            title: "Slide 5: Domestic Use",
                            content: "Home robots include vacuum cleaners, lawn mowers, security systems, and personal assistants that make daily life more convenient and comfortable."
                        }
                    ]
                }
            ]
        },
        {
            id: "unit-2",
            title: "Unit 2: Robot Programming",
            description: "Programming languages and techniques for robot control",
            lessons: [
                {
                    id: "lesson-2-1",
                    title: "Lesson 1: Programming Languages",
                    description: "Common languages used in robotics",
                    slides: [
                        {
                            id: "slide-2-1-1",
                            title: "Slide 1: C/C++ in Robotics",
                            content: "C and C++ are widely used for real-time robot control due to their speed and low-level hardware access capabilities. They're essential for embedded systems programming."
                        },
                        {
                            id: "slide-2-1-2",
                            title: "Slide 2: Python for Robotics",
                            content: "Python's simplicity and extensive libraries make it popular for robot programming, especially for AI, computer vision, and rapid prototyping applications.",
                            isAssignment: true,
                            dueDate: "2024-02-04"
                        },
                        {
                            id: "slide-2-1-3",
                            title: "Slide 3: ROS (Robot Operating System)",
                            content: "ROS is a flexible framework for writing robot software. It provides tools, libraries, and conventions that simplify complex robot programming tasks."
                        },
                        {
                            id: "slide-2-1-4",
                            title: "Slide 4: MATLAB/Simulink",
                            content: "MATLAB and Simulink are used for robot modeling, simulation, and algorithm development, particularly in research and development environments.",
                            isAssignment: true,
                            dueDate: "2024-02-09"
                        },
                        {
                            id: "slide-2-1-5",
                            title: "Slide 5: Specialized Languages",
                            content: "Some robots use specialized languages like RAPID (ABB), KRL (KUKA), or KAREL (FANUC) designed specifically for industrial robot programming."
                        }
                    ]
                },
                {
                    id: "lesson-2-2",
                    title: "Lesson 2: Control Systems",
                    description: "Understanding robot control architectures",
                    slides: [
                        {
                            id: "slide-2-2-1",
                            title: "Slide 1: Open-Loop Control",
                            content: "Open-loop systems execute commands without feedback. They're simple but can't adapt to disturbances or errors during execution."
                        },
                        {
                            id: "slide-2-2-2",
                            title: "Slide 2: Closed-Loop Control",
                            content: "Closed-loop systems use feedback to monitor and adjust performance. They're more complex but provide better accuracy and adaptability.",
                            isAssignment: true,
                            dueDate: "2024-02-09"
                        },
                        {
                            id: "slide-2-2-3",
                            title: "Slide 3: PID Controllers",
                            content: "Proportional-Integral-Derivative controllers are fundamental in robotics, providing smooth and stable control of robot movements and positioning."
                        },
                        {
                            id: "slide-2-2-4",
                            title: "Slide 4: Hierarchical Control",
                            content: "Complex robots use hierarchical control with multiple levels: high-level planning, mid-level coordination, and low-level motor control.",
                            isAssignment: true,
                            dueDate: "2024-02-14"
                        },
                        {
                            id: "slide-2-2-5",
                            title: "Slide 5: Adaptive Control",
                            content: "Advanced robots use adaptive control systems that learn and adjust their behavior based on experience and changing environmental conditions."
                        }
                    ]
                },
                {
                    id: "lesson-2-3",
                    title: "Lesson 3: Sensors and Perception",
                    description: "How robots sense and interpret their environment",
                    slides: [
                        {
                            id: "slide-2-3-1",
                            title: "Slide 1: Vision Systems",
                            content: "Cameras and computer vision algorithms enable robots to see and interpret visual information, essential for navigation and object recognition."
                        },
                        {
                            id: "slide-2-3-2",
                            title: "Slide 2: Distance Sensors",
                            content: "Ultrasonic, infrared, and LiDAR sensors measure distances to objects, enabling obstacle avoidance and spatial mapping capabilities.",
                            isAssignment: true,
                            dueDate: "2024-02-14"
                        },
                        {
                            id: "slide-2-3-3",
                            title: "Slide 3: Inertial Sensors",
                            content: "Gyroscopes and accelerometers provide information about robot orientation and movement, crucial for balance and navigation."
                        },
                        {
                            id: "slide-2-3-4",
                            title: "Slide 4: Touch and Force Sensors",
                            content: "Tactile sensors enable robots to feel contact forces and textures, important for delicate manipulation tasks and human-robot interaction.",
                            isAssignment: true,
                            dueDate: "2024-02-19"
                        },
                        {
                            id: "slide-2-3-5",
                            title: "Slide 5: Sensor Fusion",
                            content: "Combining data from multiple sensors provides more accurate and reliable perception, improving robot decision-making and performance."
                        }
                    ]
                },
                {
                    id: "lesson-2-4",
                    title: "Lesson 4: Motion Planning",
                    description: "Algorithms for robot movement and path planning",
                    slides: [
                        {
                            id: "slide-2-4-1",
                            title: "Slide 1: Path Planning Basics",
                            content: "Path planning involves finding a collision-free route from a start position to a goal position while considering robot constraints and obstacles."
                        },
                        {
                            id: "slide-2-4-2",
                            title: "Slide 2: Grid-Based Methods",
                            content: "Algorithms like A* and Dijkstra's work on discretized maps, finding optimal paths through grid representations of the environment.",
                            isAssignment: true,
                            dueDate: "2024-02-19"
                        },
                        {
                            id: "slide-2-4-3",
                            title: "Slide 3: Sampling-Based Methods",
                            content: "RRT (Rapidly-exploring Random Trees) and PRM (Probabilistic Roadmaps) use random sampling to explore high-dimensional configuration spaces."
                        },
                        {
                            id: "slide-2-4-4",
                            title: "Slide 4: Trajectory Generation",
                            content: "Converting paths into smooth trajectories with velocity and acceleration profiles that respect robot dynamics and constraints.",
                            isAssignment: true,
                            dueDate: "2024-02-24"
                        },
                        {
                            id: "slide-2-4-5",
                            title: "Slide 5: Dynamic Replanning",
                            content: "Real-time path replanning allows robots to adapt to moving obstacles and changing environments during task execution."
                        }
                    ]
                },
                {
                    id: "lesson-2-5",
                    title: "Lesson 5: Robot Communication",
                    description: "How robots communicate with systems and humans",
                    slides: [
                        {
                            id: "slide-2-5-1",
                            title: "Slide 1: Serial Communication",
                            content: "UART, SPI, and I2C protocols enable communication between robot components like microcontrollers, sensors, and actuators."
                        },
                        {
                            id: "slide-2-5-2",
                            title: "Slide 2: Wireless Communication",
                            content: "WiFi, Bluetooth, and radio frequency communication allow robots to connect with remote systems and receive commands wirelessly.",
                            isAssignment: true,
                            dueDate: "2024-02-24"
                        },
                        {
                            id: "slide-2-5-3",
                            title: "Slide 3: Network Protocols",
                            content: "TCP/IP, UDP, and specialized protocols like DDS enable robots to communicate over networks and integrate with larger systems."
                        },
                        {
                            id: "slide-2-5-4",
                            title: "Slide 4: Human-Robot Interface",
                            content: "Voice recognition, gesture control, and graphical interfaces enable natural communication between humans and robots.",
                            isAssignment: true,
                            dueDate: "2024-02-29"
                        },
                        {
                            id: "slide-2-5-5",
                            title: "Slide 5: Multi-Robot Communication",
                            content: "Swarm robotics requires sophisticated communication protocols for coordination, task allocation, and collective behavior."
                        }
                    ]
                }
            ]
        },
        {
            id: "unit-3",
            title: "Unit 3: Robot Hardware",
            description: "Physical components and mechanical design of robots",
            lessons: [
                {
                    id: "lesson-3-1",
                    title: "Lesson 1: Mechanical Design",
                    description: "Structural design principles for robots",
                    slides: [
                        {
                            id: "slide-3-1-1",
                            title: "Slide 1: Design Principles",
                            content: "Robot mechanical design must balance strength, weight, cost, and functionality while considering manufacturing constraints and maintenance requirements."
                        },
                        {
                            id: "slide-3-1-2",
                            title: "Slide 2: Materials Selection",
                            content: "Common materials include aluminum for lightweight structures, steel for strength, plastics for cost-effectiveness, and carbon fiber for high-performance applications.",
                            isAssignment: true,
                            dueDate: "2024-02-29"
                        },
                        {
                            id: "slide-3-1-3",
                            title: "Slide 3: Joint Design",
                            content: "Robot joints enable movement and can be revolute (rotational), prismatic (linear), or specialized types like ball joints or flexible couplings."
                        },
                        {
                            id: "slide-3-1-4",
                            title: "Slide 4: Kinematic Chains",
                            content: "The arrangement of links and joints forms kinematic chains that determine the robot's workspace, degrees of freedom, and movement capabilities.",
                            isAssignment: true,
                            dueDate: "2024-03-05"
                        },
                        {
                            id: "slide-3-1-5",
                            title: "Slide 5: End Effectors",
                            content: "End effectors are tools attached to robot arms, including grippers, welding torches, cameras, or specialized tools for specific applications."
                        }
                    ]
                },
                {
                    id: "lesson-3-2",
                    title: "Lesson 2: Actuators and Motors",
                    description: "Systems that create robot movement",
                    slides: [
                        {
                            id: "slide-3-2-1",
                            title: "Slide 1: Electric Motors",
                            content: "DC motors, stepper motors, and servo motors are common in robotics, each offering different advantages for speed, precision, and control."
                        },
                        {
                            id: "slide-3-2-2",
                            title: "Slide 2: Hydraulic Systems",
                            content: "Hydraulic actuators provide high force and power-to-weight ratios, commonly used in heavy-duty industrial robots and construction equipment.",
                            isAssignment: true,
                            dueDate: "2024-03-05"
                        },
                        {
                            id: "slide-3-2-3",
                            title: "Slide 3: Pneumatic Systems",
                            content: "Pneumatic actuators use compressed air for fast, simple movements. They're cost-effective but offer limited precision and control."
                        },
                        {
                            id: "slide-3-2-4",
                            title: "Slide 4: Gear Systems",
                            content: "Gearboxes reduce motor speed while increasing torque, enabling precise control and sufficient power for robot movements.",
                            isAssignment: true,
                            dueDate: "2024-03-10"
                        },
                        {
                            id: "slide-3-2-5",
                            title: "Slide 5: Linear Actuators",
                            content: "Linear actuators create straight-line motion using lead screws, ball screws, or direct linear motors for applications requiring linear movement."
                        }
                    ]
                },
                {
                    id: "lesson-3-3",
                    title: "Lesson 3: Power Systems",
                    description: "Electrical power and energy management",
                    slides: [
                        {
                            id: "slide-3-3-1",
                            title: "Slide 1: Battery Technologies",
                            content: "Lithium-ion, lead-acid, and fuel cells provide portable power for mobile robots, each with different energy density and cost characteristics."
                        },
                        {
                            id: "slide-3-3-2",
                            title: "Slide 2: Power Management",
                            content: "Efficient power management systems regulate voltage, manage charging, and optimize energy consumption to maximize robot operating time.",
                            isAssignment: true,
                            dueDate: "2024-03-10"
                        },
                        {
                            id: "slide-3-3-3",
                            title: "Slide 3: Motor Drivers",
                            content: "Motor driver circuits control actuator power and speed, converting low-power control signals into high-power motor commands."
                        },
                        {
                            id: "slide-3-3-4",
                            title: "Slide 4: Power Distribution",
                            content: "Electrical systems distribute power to various robot components while providing protection through fuses, circuit breakers, and isolation.",
                            isAssignment: true,
                            dueDate: "2024-03-15"
                        },
                        {
                            id: "slide-3-3-5",
                            title: "Slide 5: Energy Efficiency",
                            content: "Optimizing robot energy consumption through efficient motors, regenerative braking, and intelligent power management extends operating time."
                        }
                    ]
                },
                {
                    id: "lesson-3-4",
                    title: "Lesson 4: Electronics and Circuits",
                    description: "Electronic systems and circuit design",
                    slides: [
                        {
                            id: "slide-3-4-1",
                            title: "Slide 1: Microcontrollers",
                            content: "Microcontrollers like Arduino and Raspberry Pi provide the computational power for robot control, sensor processing, and decision-making."
                        },
                        {
                            id: "slide-3-4-2",
                            title: "Slide 2: Sensor Interfaces",
                            content: "Analog-to-digital converters, signal conditioning circuits, and communication interfaces connect sensors to the robot's control system.",
                            isAssignment: true,
                            dueDate: "2024-03-15"
                        },
                        {
                            id: "slide-3-4-3",
                            title: "Slide 3: PCB Design",
                            content: "Printed circuit boards integrate electronic components, providing reliable connections and compact packaging for robot electronics."
                        },
                        {
                            id: "slide-3-4-4",
                            title: "Slide 4: Signal Processing",
                            content: "Filtering, amplification, and digital signal processing improve sensor data quality and reduce noise in robot control systems.",
                            isAssignment: true,
                            dueDate: "2024-03-20"
                        },
                        {
                            id: "slide-3-4-5",
                            title: "Slide 5: Safety Systems",
                            content: "Emergency stops, fault detection, and fail-safe mechanisms protect both the robot and its environment from dangerous situations."
                        }
                    ]
                },
                {
                    id: "lesson-3-5",
                    title: "Lesson 5: Manufacturing and Assembly",
                    description: "Building and assembling robot systems",
                    slides: [
                        {
                            id: "slide-3-5-1",
                            title: "Slide 1: Manufacturing Processes",
                            content: "3D printing, CNC machining, injection molding, and sheet metal fabrication are common methods for producing robot components."
                        },
                        {
                            id: "slide-3-5-2",
                            title: "Slide 2: Assembly Techniques",
                            content: "Mechanical fasteners, welding, adhesives, and press-fits join robot components while allowing for maintenance and repair.",
                            isAssignment: true,
                            dueDate: "2024-03-20"
                        },
                        {
                            id: "slide-3-5-3",
                            title: "Slide 3: Quality Control",
                            content: "Testing procedures, calibration methods, and quality assurance ensure robot components meet specifications and performance requirements."
                        },
                        {
                            id: "slide-3-5-4",
                            title: "Slide 4: Modular Design",
                            content: "Modular robot design enables easy assembly, maintenance, and customization by using standardized interfaces and interchangeable components.",
                            isAssignment: true,
                            dueDate: "2024-03-25"
                        },
                        {
                            id: "slide-3-5-5",
                            title: "Slide 5: Documentation",
                            content: "Assembly instructions, wiring diagrams, and maintenance manuals are essential for proper robot construction and ongoing support."
                        }
                    ]
                }
            ]
        },
        {
            id: "unit-4",
            title: "Unit 4: Advanced Topics",
            description: "Cutting-edge robotics technologies and future trends",
            lessons: [
                {
                    id: "lesson-4-1",
                    title: "Lesson 1: Artificial Intelligence",
                    description: "AI integration in robotics systems",
                    slides: [
                        {
                            id: "slide-4-1-1",
                            title: "Slide 1: Machine Learning Basics",
                            content: "Machine learning enables robots to improve performance through experience, using algorithms like supervised learning, unsupervised learning, and reinforcement learning."
                        },
                        {
                            id: "slide-4-1-2",
                            title: "Slide 2: Computer Vision",
                            content: "AI-powered computer vision allows robots to recognize objects, navigate environments, and interact with the world using visual information.",
                            isAssignment: true,
                            dueDate: "2024-03-25"
                        },
                        {
                            id: "slide-4-1-3",
                            title: "Slide 3: Natural Language Processing",
                            content: "NLP enables robots to understand and respond to human speech, making human-robot interaction more natural and intuitive."
                        },
                        {
                            id: "slide-4-1-4",
                            title: "Slide 4: Decision Making",
                            content: "AI algorithms help robots make complex decisions in uncertain environments, balancing multiple objectives and constraints.",
                            isAssignment: true,
                            dueDate: "2024-03-30"
                        },
                        {
                            id: "slide-4-1-5",
                            title: "Slide 5: Learning from Demonstration",
                            content: "Robots can learn new tasks by observing human demonstrations, reducing the need for explicit programming of every behavior."
                        }
                    ]
                },
                {
                    id: "lesson-4-2",
                    title: "Lesson 2: Swarm Robotics",
                    description: "Coordination of multiple robots",
                    slides: [
                        {
                            id: "slide-4-2-1",
                            title: "Slide 1: Swarm Intelligence",
                            content: "Swarm robotics studies how simple robots can work together to achieve complex tasks through local interactions and emergent behavior."
                        },
                        {
                            id: "slide-4-2-2",
                            title: "Slide 2: Communication Protocols",
                            content: "Swarm robots use various communication methods including direct wireless communication, stigmergy (environmental modification), and visual signals.",
                            isAssignment: true,
                            dueDate: "2024-03-30"
                        },
                        {
                            id: "slide-4-2-3",
                            title: "Slide 3: Coordination Algorithms",
                            content: "Algorithms like flocking, consensus, and distributed task allocation enable swarm robots to coordinate their actions without central control."
                        },
                        {
                            id: "slide-4-2-4",
                            title: "Slide 4: Applications",
                            content: "Swarm robotics applications include search and rescue, environmental monitoring, construction, and military operations.",
                            isAssignment: true,
                            dueDate: "2024-04-04"
                        },
                        {
                            id: "slide-4-2-5",
                            title: "Slide 5: Challenges",
                            content: "Key challenges include scalability, fault tolerance, communication limitations, and ensuring predictable collective behavior."
                        }
                    ]
                },
                {
                    id: "lesson-4-3",
                    title: "Lesson 3: Human-Robot Interaction",
                    description: "Designing robots that work with humans",
                    slides: [
                        {
                            id: "slide-4-3-1",
                            title: "Slide 1: Social Robotics",
                            content: "Social robots are designed to interact with humans in natural, intuitive ways, considering psychological and social factors in their design."
                        },
                        {
                            id: "slide-4-3-2",
                            title: "Slide 2: Safety Considerations",
                            content: "Human-robot interaction requires careful attention to physical safety, including collision avoidance, force limiting, and emergency stop systems.",
                            isAssignment: true,
                            dueDate: "2024-04-04"
                        },
                        {
                            id: "slide-4-3-3",
                            title: "Slide 3: User Interface Design",
                            content: "Effective interfaces use voice, gesture, touch, and visual displays to enable natural communication between humans and robots."
                        },
                        {
                            id: "slide-4-3-4",
                            title: "Slide 4: Trust and Acceptance",
                            content: "Building user trust requires predictable robot behavior, clear communication of capabilities and limitations, and appropriate anthropomorphic design.",
                            isAssignment: true,
                            dueDate: "2024-04-09"
                        },
                        {
                            id: "slide-4-3-5",
                            title: "Slide 5: Collaborative Robotics",
                            content: "Cobots (collaborative robots) work alongside humans in shared workspaces, requiring advanced safety systems and intuitive interaction methods."
                        }
                    ]
                },
                {
                    id: "lesson-4-4",
                    title: "Lesson 4: Autonomous Systems",
                    description: "Self-operating robot systems",
                    slides: [
                        {
                            id: "slide-4-4-1",
                            title: "Slide 1: Levels of Autonomy",
                            content: "Autonomous systems range from teleoperated to fully autonomous, with varying degrees of human supervision and intervention capability."
                        },
                        {
                            id: "slide-4-4-2",
                            title: "Slide 2: SLAM Technology",
                            content: "Simultaneous Localization and Mapping enables robots to build maps of unknown environments while tracking their own location.",
                            isAssignment: true,
                            dueDate: "2024-04-09"
                        },
                        {
                            id: "slide-4-4-3",
                            title: "Slide 3: Autonomous Navigation",
                            content: "Self-driving capabilities require integration of perception, planning, and control systems to navigate safely in dynamic environments."
                        },
                        {
                            id: "slide-4-4-4",
                            title: "Slide 4: Fault Tolerance",
                            content: "Autonomous systems must handle component failures gracefully, using redundancy, error detection, and recovery strategies.",
                            isAssignment: true,
                            dueDate: "2024-04-14"
                        },
                        {
                            id: "slide-4-4-5",
                            title: "Slide 5: Ethical Considerations",
                            content: "Autonomous robots raise ethical questions about decision-making, accountability, and the appropriate level of machine independence."
                        }
                    ]
                },
                {
                    id: "lesson-4-5",
                    title: "Lesson 5: Future of Robotics",
                    description: "Emerging trends and future developments",
                    slides: [
                        {
                            id: "slide-4-5-1",
                            title: "Slide 1: Soft Robotics",
                            content: "Soft robots use flexible materials and bio-inspired designs to safely interact with delicate objects and work in unstructured environments."
                        },
                        {
                            id: "slide-4-5-2",
                            title: "Slide 2: Bio-Inspired Robotics",
                            content: "Learning from nature, robots are being designed with capabilities inspired by animals, from gecko-like climbing to bird-like flight.",
                            isAssignment: true,
                            dueDate: "2024-04-14"
                        },
                        {
                            id: "slide-4-5-3",
                            title: "Slide 3: Quantum Robotics",
                            content: "Quantum computing may revolutionize robot intelligence, enabling unprecedented computational power for complex decision-making and optimization."
                        },
                        {
                            id: "slide-4-5-4",
                            title: "Slide 4: Nano-Robotics",
                            content: "Microscopic robots could revolutionize medicine, manufacturing, and environmental remediation through precise manipulation at the molecular level.",
                            isAssignment: true,
                            dueDate: "2024-04-19"
                        },
                        {
                            id: "slide-4-5-5",
                            title: "Slide 5: Societal Impact",
                            content: "The future of robotics will reshape work, healthcare, transportation, and daily life, requiring careful consideration of social and economic implications."
                        }
                    ]
                }
            ]
        }
    ]
};

// Application State
let currentState = {
    level: 'course', // 'course', 'unit', 'lesson', 'slide'
    unitId: null,
    lessonId: null,
    slideIndex: 0,
    navigationHistory: []
};

// Progress Tracking
let progressData = {
    viewedSlides: new Set(), // Set of slide IDs that have been viewed
    completedLessons: new Set(), // Set of lesson IDs that are fully completed
    completedUnits: new Set() // Set of unit IDs that are fully completed
};

// DOM Elements
const sidebarBreadcrumb = document.getElementById('sidebar-breadcrumb');
const backBtn = document.getElementById('back-btn');
const navigationList = document.getElementById('navigation-list');
const contentArea = document.getElementById('content-area');
// Removed: const breadcrumb = document.getElementById('breadcrumb');
const accordionNavigation = document.getElementById('accordion-navigation');
const headerTitle = document.getElementById('header-title');
const headerSubtitle = document.getElementById('header-subtitle');
const progressContainer = document.getElementById('progress-container');
const progressFill = document.getElementById('progress-fill');

// Progress Tracking Functions
function markSlideAsViewed(slideId) {
    progressData.viewedSlides.add(slideId);
    updateProgressStatus();
}

function isSlideViewed(slideId) {
    return progressData.viewedSlides.has(slideId);
}

function isLessonCompleted(lesson) {
    return lesson.slides.every(slide => progressData.viewedSlides.has(slide.id));
}

function isUnitCompleted(unit) {
    return unit.lessons.every(lesson => isLessonCompleted(lesson));
}

function updateProgressStatus() {
    // Update completed lessons
    courseData.units.forEach(unit => {
        unit.lessons.forEach(lesson => {
            if (isLessonCompleted(lesson)) {
                progressData.completedLessons.add(lesson.id);
            }
        });
    });
    
    // Update completed units
    courseData.units.forEach(unit => {
        if (isUnitCompleted(unit)) {
            progressData.completedUnits.add(unit.id);
        }
    });
}

function getProgressIcon(isCompleted) {
    return isCompleted ? 'fas fa-circle-check' : 'far fa-circle';
}

// Content Header Functions
function updateContentHeader() {
    switch (currentState.level) {
        case 'course':
            headerTitle.textContent = 'Robotics Course';
            headerSubtitle.textContent = 'Select a unit to begin your learning journey';
            
            // Calculate overall course progress (completed units / total units)
            const completedUnitsCount = courseData.units.filter(unit => isUnitCompleted(unit)).length;
            const courseProgress = (completedUnitsCount / courseData.units.length) * 100;
            
            progressContainer.style.display = 'block';
            progressFill.style.width = `${courseProgress}cqw`;
            break;
            
        case 'unit':
            const unit = courseData.units.find(u => u.id === currentState.unitId);
            headerTitle.textContent = unit.title;
            headerSubtitle.textContent = `${unit.lessons.length} lessons available`;
            progressContainer.style.display = 'none';
            break;
            
        case 'lesson':
        case 'slide':
            const lessonUnit = courseData.units.find(u => u.id === currentState.unitId);
            const lesson = lessonUnit.lessons.find(l => l.id === currentState.lessonId);
            headerTitle.textContent = lesson.title;
            
            if (currentState.level === 'lesson') {
                headerSubtitle.textContent = `${lesson.slides.length} slides in this lesson`;
            } else {
                headerSubtitle.textContent = `Slide ${currentState.slideIndex + 1} of ${lesson.slides.length}`;
            }
            
            progressContainer.style.display = 'none';
            break;
    }
}

// Initialize the application
function init() {
    renderNavigation();
    renderContent();
    renderAccordionNavigation();
    updateContentHeader();
    setupEventListeners();
}

// Update sidebar breadcrumb based on current state
function updateSidebarBreadcrumb() {
    let breadcrumbHTML = '<div class="breadcrumb-item" data-level="course">Robotics Course</div>';
    
    if (currentState.unitId) {
        const unit = courseData.units.find(u => u.id === currentState.unitId);
        breadcrumbHTML += '<div class="breadcrumb-item" data-level="unit" data-unit-id="' + unit.id + '">' + unit.title + '</div>';
    }
    
    if (currentState.lessonId) {
        const unit = courseData.units.find(u => u.id === currentState.unitId);
        const lesson = unit.lessons.find(l => l.id === currentState.lessonId);
        breadcrumbHTML += '<div class="breadcrumb-item" data-level="lesson" data-unit-id="' + unit.id + '" data-lesson-id="' + lesson.id + '">' + lesson.title + '</div>';
    }
    
    // Make the last item active
    breadcrumbHTML = breadcrumbHTML.replace(/breadcrumb-item"([^>]*)>([^<]+)<\/div>$/, 'breadcrumb-item active"$1>$2</div>');
    
    sidebarBreadcrumb.innerHTML = breadcrumbHTML;
    
    // Add click event listeners to breadcrumb items
    setupBreadcrumbEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    backBtn.addEventListener('click', goBack);
}

// Setup breadcrumb click event listeners
function setupBreadcrumbEventListeners() {
    const breadcrumbItems = sidebarBreadcrumb.querySelectorAll('.breadcrumb-item:not(.active)');
    breadcrumbItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const level = item.dataset.level;
            const unitId = item.dataset.unitId;
            const lessonId = item.dataset.lessonId;
            
            navigateToBreadcrumbLevel(level, unitId, lessonId);
        });
    });
}

// Navigate to a specific breadcrumb level
function navigateToBreadcrumbLevel(level, unitId, lessonId) {
    switch (level) {
        case 'course':
            currentState.level = 'course';
            currentState.unitId = null;
            currentState.lessonId = null;
            currentState.slideIndex = 0;
            break;
        case 'unit':
            currentState.level = 'unit';
            currentState.unitId = unitId;
            currentState.lessonId = null;
            currentState.slideIndex = 0;
            break;
        case 'lesson':
            currentState.level = 'lesson';
            currentState.unitId = unitId;
            currentState.lessonId = lessonId;
            currentState.slideIndex = 0;
            break;
    }
    
    // Re-render all navigation components
    renderNavigation();
    renderContent();
    renderAccordionNavigation();
    updateContentHeader();
}

// Navigation rendering functions
function renderNavigation() {
    switch (currentState.level) {
        case 'course':
            renderUnits();
            break;
        case 'unit':
            renderLessons();
            break;
        case 'lesson':
            renderSlides();
            break;
        case 'slide':
            renderSlides();
            break;
    }
}

function renderUnits() {
    updateSidebarBreadcrumb();
    backBtn.style.display = 'none';
    
    navigationList.innerHTML = '';
    courseData.units.forEach((unit, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'nav-item';
        const isCompleted = isUnitCompleted(unit);
        const progressIcon = getProgressIcon(isCompleted);
        listItem.innerHTML = `
            <div class="nav-item-icon">
                <i class="${progressIcon}"></i>
            </div>
            <div class="nav-item-content">
                <div class="nav-item-title">${unit.title}</div>
                <div class="nav-item-subtitle">${unit.lessons.length} lessons</div>
            </div>
        `;
        listItem.addEventListener('click', () => navigateToUnit(unit.id));
        navigationList.appendChild(listItem);
    });
}

function renderLessons() {
    updateSidebarBreadcrumb();
    backBtn.style.display = 'flex';
    backBtn.innerHTML = '<span>←</span> Back to Course';
    
    navigationList.innerHTML = '';
    const unit = courseData.units.find(u => u.id === currentState.unitId);
    unit.lessons.forEach((lesson, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'nav-item';
        if (lesson.id === currentState.lessonId) {
            listItem.classList.add('active');
        }
        const isCompleted = isLessonCompleted(lesson);
        const progressIcon = getProgressIcon(isCompleted);
        listItem.innerHTML = `
            <div class="nav-item-icon">
                <i class="${progressIcon}"></i>
            </div>
            <div class="nav-item-content">
                <div class="nav-item-title">${lesson.title}</div>
                <div class="nav-item-subtitle">${lesson.slides.length} slides</div>
            </div>
        `;
        listItem.addEventListener('click', () => navigateToLesson(lesson.id));
        navigationList.appendChild(listItem);
    });
}

function renderSlides() {
    updateSidebarBreadcrumb();
    backBtn.style.display = 'flex';
    backBtn.innerHTML = '<i class="fas fa-chevron-left"></i> Back to Unit';
    
    navigationList.innerHTML = '';
    const unit = courseData.units.find(u => u.id === currentState.unitId);
    const lesson = unit.lessons.find(l => l.id === currentState.lessonId);
    lesson.slides.forEach((slide, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'nav-item';
        if (index === currentState.slideIndex) {
            listItem.classList.add('active');
        }
        const isViewed = isSlideViewed(slide.id);
        const progressIcon = getProgressIcon(isViewed);
        const dueDateHTML = slide.isAssignment ? `<div class="nav-item-due-date">Due: ${slide.dueDate}</div>` : '';
        listItem.innerHTML = `
            <div class="nav-item-icon">
                <i class="${progressIcon}"></i>
            </div>
            <div class="nav-item-content">
                <div class="nav-item-title">${slide.title}</div>
                <div class="nav-item-subtitle">Slide ${index + 1}${slide.isAssignment ? ' (Assignment)' : ''}</div>
                ${dueDateHTML}
            </div>
        `;
        listItem.addEventListener('click', () => navigateToSlide(index));
        navigationList.appendChild(listItem);
    });
}

// Content rendering functions
function renderContent() {
    switch (currentState.level) {
        case 'course':
            renderCourseContent();
            break;
        case 'unit':
            renderUnitContent();
            break;
        case 'lesson':
            renderLessonContent();
            break;
        case 'slide':
            renderSlideContent();
            break;
    }
    // Removed: updateBreadcrumb() call - no longer needed
}

function renderCourseContent() {
    contentArea.innerHTML = `
        <div class="welcome-screen">
            <h1>Welcome to ${courseData.title}</h1>
            <p>${courseData.description}</p>
            <div class="course-stats">
                <div class="stat-item">
                    <span class="stat-number">${courseData.units.length}</span>
                    <span class="stat-label">Units</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${courseData.units.reduce((total, unit) => total + unit.lessons.length, 0)}</span>
                    <span class="stat-label">Lessons</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${courseData.units.reduce((total, unit) => total + unit.lessons.reduce((lessonTotal, lesson) => lessonTotal + lesson.slides.length, 0), 0)}</span>
                    <span class="stat-label">Slides</span>
                </div>
            </div>
        </div>
    `;
}

function renderUnitContent() {
    const unit = courseData.units.find(u => u.id === currentState.unitId);
    contentArea.innerHTML = `
        <div class="unit-content">
            <h1>${unit.title}</h1>
            <p>${unit.description}</p>
            <div class="lesson-list">
                ${unit.lessons.map((lesson, index) => `
                    <div class="lesson-card" onclick="navigateToLesson('${lesson.id}')">
                        <div class="lesson-card-content">
                            <h3>${lesson.title}</h3>
                            <p>${lesson.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderLessonContent() {
    const unit = courseData.units.find(u => u.id === currentState.unitId);
    const lesson = unit.lessons.find(l => l.id === currentState.lessonId);
    contentArea.innerHTML = `
        <div class="lesson-content">
            <h1>${lesson.title}</h1>
            <p>${lesson.description}</p>
            <p>This lesson contains ${lesson.slides.length} slides. Select a slide from the sidebar to begin.</p>
        </div>
    `;
}

function renderSlideContent() {
    const unit = courseData.units.find(u => u.id === currentState.unitId);
    const lesson = unit.lessons.find(l => l.id === currentState.lessonId);
    const slide = lesson.slides[currentState.slideIndex];
    
    contentArea.innerHTML = `
        <div class="slide-content">
            <div class="slide-content-text">
                <h1>${slide.title}</h1>
                <p>${slide.content}</p>
            </div>
            <div class="slide-navigation">
                <button class="slide-nav-btn" onclick="previousSlide()" ${currentState.slideIndex === 0 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left"></i> Previous
                </button>
                <span class="slide-counter">
                    ${currentState.slideIndex + 1} of ${lesson.slides.length}
                </span>
                <button class="slide-nav-btn" onclick="nextSlide()" ${currentState.slideIndex === lesson.slides.length - 1 ? 'disabled' : ''}>
                    Next <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    `;
}

// Navigation functions
function navigateToUnit(unitId) {
    currentState.level = 'unit';
    currentState.unitId = unitId;
    currentState.lessonId = null;
    currentState.slideIndex = 0;
    renderNavigation();
    renderContent();
    renderAccordionNavigation();
    updateContentHeader();
}

function navigateToLesson(lessonId) {
    if (currentState.level === 'course') {
        // Find the unit that contains this lesson
        const unit = courseData.units.find(u => u.lessons.some(l => l.id === lessonId));
        currentState.unitId = unit.id;
    }
    
    currentState.level = 'lesson';
    currentState.lessonId = lessonId;
    currentState.slideIndex = 0;
    
    // Mark first slide as viewed when entering lesson
    const unit = courseData.units.find(u => u.id === currentState.unitId);
    const lesson = unit.lessons.find(l => l.id === lessonId);
    const firstSlide = lesson.slides[0];
    markSlideAsViewed(firstSlide.id);
    
    renderNavigation();
    renderContent();
    renderAccordionNavigation();
    updateContentHeader();
}

function navigateToSlide(slideIndex) {
    currentState.level = 'slide';
    currentState.slideIndex = slideIndex;
    
    // Mark slide as viewed
    const unit = courseData.units.find(u => u.id === currentState.unitId);
    const lesson = unit.lessons.find(l => l.id === currentState.lessonId);
    const slide = lesson.slides[slideIndex];
    markSlideAsViewed(slide.id);
    
    renderNavigation();
    renderContent();
    renderAccordionNavigation();
    updateContentHeader();
}

function goBack() {
    // Navigate back one level in the hierarchy
    switch (currentState.level) {
        case 'slide':
            // From slide level, go back to unit level (showing all lessons)
            currentState.level = 'unit';
            currentState.lessonId = null;
            currentState.slideIndex = 0;
            break;
        case 'lesson':
            // From lesson level, go back to unit level (showing all lessons)
            currentState.level = 'unit';
            currentState.lessonId = null;
            currentState.slideIndex = 0;
            break;
        case 'unit':
            // From unit level, go back to course level (showing all units)
            currentState.level = 'course';
            currentState.unitId = null;
            currentState.lessonId = null;
            currentState.slideIndex = 0;
            break;
    }
    renderNavigation();
    renderContent();
    renderAccordionNavigation();
    updateContentHeader();
}

function previousSlide() {
    if (currentState.slideIndex > 0) {
        currentState.slideIndex--;
        
        // Mark slide as viewed
        const unit = courseData.units.find(u => u.id === currentState.unitId);
        const lesson = unit.lessons.find(l => l.id === currentState.lessonId);
        const slide = lesson.slides[currentState.slideIndex];
        markSlideAsViewed(slide.id);
        
        renderNavigation();
        renderContent();
        renderAccordionNavigation();
        updateContentHeader();
    }
}

function nextSlide() {
    const unit = courseData.units.find(u => u.id === currentState.unitId);
    const lesson = unit.lessons.find(l => l.id === currentState.lessonId);
    if (currentState.slideIndex < lesson.slides.length - 1) {
        currentState.slideIndex++;
        
        // Mark slide as viewed
        const slide = lesson.slides[currentState.slideIndex];
        markSlideAsViewed(slide.id);
        
        renderNavigation();
        renderContent();
        renderAccordionNavigation();
        updateContentHeader();
    }
}

// Removed: updateBreadcrumb() function - no longer needed since content-header breadcrumb was removed

// Accordion Navigation Functions
function renderAccordionNavigation() {
    accordionNavigation.innerHTML = '';
    
    courseData.units.forEach((unit, unitIndex) => {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';
        
        const isUnitActive = currentState.unitId === unit.id;
        const isExpanded = isUnitActive;
        
        const unitCompleted = isUnitCompleted(unit);
        const unitProgressIcon = getProgressIcon(unitCompleted);
        
        accordionItem.innerHTML = `
            <button class="accordion-header ${isUnitActive ? 'active' : ''}" data-unit-id="${unit.id}">
                <div class="accordion-progress-icon">
                    <i class="${unitProgressIcon}"></i>
                </div>
                <div class="accordion-header-content">
                    <div class="accordion-title">${unit.title}</div>
                    <div class="accordion-subtitle">${unit.lessons.length} lessons</div>
                </div>
                <div class="accordion-icon ${isExpanded ? 'expanded' : ''}"><i class="fas fa-chevron-right"></i></div>
            </button>
            <div class="accordion-content ${isExpanded ? 'expanded' : ''}" data-unit-id="${unit.id}">
                <div class="accordion-lessons">
                    ${unit.lessons.map((lesson, lessonIndex) => {
                        const isLessonActive = currentState.lessonId === lesson.id;
                        const isLessonExpanded = isLessonActive;
                        const lessonCompleted = isLessonCompleted(lesson);
                        const lessonProgressIcon = getProgressIcon(lessonCompleted);
                        return `
                        <div class="accordion-lesson">
                            <button class="accordion-lesson-header ${isLessonActive ? 'active' : ''}" 
                                    data-lesson-id="${lesson.id}" data-unit-id="${unit.id}">
                                <div class="accordion-progress-icon">
                                    <i class="${lessonProgressIcon}"></i>
                                </div>
                                <div class="accordion-lesson-content">
                                    <div class="accordion-lesson-title">${lesson.title}</div>
                                    <div class="accordion-lesson-subtitle">${lesson.slides.length} slides</div>
                                </div>
                                <div class="accordion-lesson-icon ${isLessonExpanded ? 'expanded' : ''}"><i class="fas fa-chevron-right"></i></div>
                            </button>
                            <div class="accordion-lesson-slides ${isLessonExpanded ? 'expanded' : ''}" 
                                 data-lesson-id="${lesson.id}">
                                ${lesson.slides.map((slide, slideIndex) => {
                                    const slideViewed = isSlideViewed(slide.id);
                                    const slideProgressIcon = getProgressIcon(slideViewed);
                                    return `
                                    <div class="accordion-slide ${currentState.level === 'slide' && currentState.slideIndex === slideIndex && currentState.lessonId === lesson.id ? 'active' : ''}" 
                                         data-slide-index="${slideIndex}" data-lesson-id="${lesson.id}" data-unit-id="${unit.id}">
                                        <div class="accordion-progress-icon">
                                            <i class="${slideProgressIcon}"></i>
                                        </div>
                                        <div class="accordion-slide-content">
                                            <div class="accordion-slide-title">${slide.title}${slide.isAssignment ? ' (Assignment)' : ''}</div>
                                            ${slide.isAssignment ? `<div class="accordion-slide-due-date">Due: ${slide.dueDate}</div>` : ''}
                                        </div>
                                    </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        
        accordionNavigation.appendChild(accordionItem);
    });
    
    // Add event listeners for accordion functionality
    setupAccordionEventListeners();
}

function setupAccordionEventListeners() {
    // Unit accordion header click handlers
    const accordionHeaders = accordionNavigation.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            e.preventDefault();
            const unitId = header.dataset.unitId;
            toggleUnitAccordion(unitId);
        });
    });
    
    // Lesson accordion header click handlers
    const lessonHeaders = accordionNavigation.querySelectorAll('.accordion-lesson-header');
    lessonHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            e.preventDefault();
            const lessonId = header.dataset.lessonId;
            const unitId = header.dataset.unitId;
            toggleLessonAccordion(unitId, lessonId);
        });
    });
    
    // Slide click handlers
    const accordionSlides = accordionNavigation.querySelectorAll('.accordion-slide');
    accordionSlides.forEach(slide => {
        slide.addEventListener('click', (e) => {
            e.preventDefault();
            const slideIndex = parseInt(slide.dataset.slideIndex);
            const lessonId = slide.dataset.lessonId;
            const unitId = slide.dataset.unitId;
            navigateToSlideFromAccordion(unitId, lessonId, slideIndex);
        });
    });
}

function toggleUnitAccordion(unitId) {
    const accordionContent = accordionNavigation.querySelector(`[data-unit-id="${unitId}"].accordion-content`);
    const accordionIcon = accordionNavigation.querySelector(`[data-unit-id="${unitId}"] .accordion-icon`);
    
    if (accordionContent && accordionIcon) {
        const isExpanded = accordionContent.classList.contains('expanded');
        
        if (isExpanded) {
            accordionContent.classList.remove('expanded');
            accordionIcon.classList.remove('expanded');
        } else {
            accordionContent.classList.add('expanded');
            accordionIcon.classList.add('expanded');
        }
    }
}

function toggleLessonAccordion(unitId, lessonId) {
    const lessonSlides = accordionNavigation.querySelector(`[data-lesson-id="${lessonId}"].accordion-lesson-slides`);
    const lessonIcon = accordionNavigation.querySelector(`[data-lesson-id="${lessonId}"] .accordion-lesson-icon`);
    
    if (lessonSlides && lessonIcon) {
        const isExpanded = lessonSlides.classList.contains('expanded');
        
        if (isExpanded) {
            lessonSlides.classList.remove('expanded');
            lessonIcon.classList.remove('expanded');
        } else {
            lessonSlides.classList.add('expanded');
            lessonIcon.classList.add('expanded');
        }
    }
}

function navigateToLessonFromAccordion(unitId, lessonId) {
    // Update current state
    currentState.level = 'lesson';
    currentState.unitId = unitId;
    currentState.lessonId = lessonId;
    currentState.slideIndex = 0;
    
    // Mark first slide as viewed when entering lesson
    const unit = courseData.units.find(u => u.id === unitId);
    const lesson = unit.lessons.find(l => l.id === lessonId);
    const firstSlide = lesson.slides[0];
    markSlideAsViewed(firstSlide.id);
    
    // Re-render all navigation components
    renderNavigation();
    renderContent();
    renderAccordionNavigation();
    updateContentHeader();
}

function navigateToSlideFromAccordion(unitId, lessonId, slideIndex) {
    // Update current state
    currentState.level = 'slide';
    currentState.unitId = unitId;
    currentState.lessonId = lessonId;
    currentState.slideIndex = slideIndex;
    
    // Mark slide as viewed
    const unit = courseData.units.find(u => u.id === unitId);
    const lesson = unit.lessons.find(l => l.id === lessonId);
    const slide = lesson.slides[slideIndex];
    markSlideAsViewed(slide.id);
    
    // Re-render all navigation components
    renderNavigation();
    renderContent();
    renderAccordionNavigation();
    updateContentHeader();
}

// Update accordion navigation when state changes
function updateAccordionNavigation() {
    renderAccordionNavigation();
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', init);
