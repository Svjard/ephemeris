import copy
import itertools
import numpy as np

class GeneticAlgorithm:
  def __init__(self, data):
    self.averageFitness = 0
    self.pastAverageFitness = 0
    self.running = True
    self.chromosomes = []
    self.data = {
      'rooms': [],
      'instructors': [],
      'sections': [],
      'sharings': [],
      'subjects': []
    }
    self.tournamentSize = .04
    self.elitePercent = .05
    self.mutationRate = .10
    self.lowVariety = 55
    self.highestFitness = 0
    self.lowestFitness = 100
    self.elites = []
    self.matingPool = []
    self.offsprings = []
    self.tempChromosome = None
    self.tempSections = None
    #self.data = data
    #self.settings = Settings.getSettings()
    #self.stopWhenMaxFitnessAt = self.settings['maximum_fitness']

  def initialization(self):
    # Generate population based on minimum population
    self.generateChromosome(self.settings['minimum_population'])
  
  def generateChromosome(self, quantity):
    for i in range(quantity):
      self.statusSignal.emit('Creating #{} of {} Chromosomes'.format(i, quantity))
      self.tempChromosome = Chromosome(self.data)
      # {id: [[subjectIds](, stay|roomId = False)]}
      self.tempSections = sections = {key: [value[2], value[3]] for (key, value) in
                                      copy.deepcopy(self.data['sections']).items()}
      # {id: [subjectId, [sections]]}
      self.tempSharings = sharings = copy.deepcopy(self.data['sharings'])
      # [roomIds]
      self.rooms = rooms = list(self.data['rooms'].keys())
      # Distributed Room selection for staying sections
      if not len(self.stayInRoomAssignments):
        selectedRooms = []
        for section in sections:
          if sections[section][1]:
            room = False
            attempts = 0
            while not room:
              attempts += 1
              candidate = np.random.choice(rooms)
              if attempts == self.settings['generation_tolerance']:
                room = candidate
              if self.data['rooms'][candidate][1] == 'lec':
                if candidate not in selectedRooms:
                  selectedRooms.append(copy.deepcopy(candidate))
                  room = candidate
                sections[section][1] = room
                self.stayInRoomAssignments[section] = room
      else:
        for section, room in self.stayInRoomAssignments.items():
          sections[section][1] = room
      # Remove subjects from sections that are already in sharing
      for sharing in sharings.values():
        for section in sharing[1]:
          sections[section][0].remove(sharing[0])
      self.generateSubjectPlacementsForSharings(sharings)
      self.generateSubjectPlacementsForSections(sections)
      self.chromosomes.append(self.tempChromosome)

    def generateSubjectPlacementsForSharings(self, sharings):
      sharingOrder = list(sharings.keys())
      np.random.shuffle(sharingOrder)
      for sharing in sharingOrder:
        result = self.generateSubjectPlacement(sharings[sharing][1], sharings[sharing][0], sharing)
        if not result:
          self.tempChromosome.data['unplaced']['sharings'].append(sharing)
