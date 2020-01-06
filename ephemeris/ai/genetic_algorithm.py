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
